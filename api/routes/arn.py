from flask import Blueprint

arn= Blueprint("arn", __name__)

# Globals
current_resource_path = ""

# path suffixes like in JS
PATH_SUFFIXES = [
    "findings",
    "statistics",
    "password_policy",
    "security_policy",
    "permissions",
    "<root_account>",
    "external_attack_surface",
    "output",
]

def update_dom(path: str, run_results: dict):
    global current_resource_path

    print("Updating DOM logic")
    global rendered_templates  # ensure we refer to the global variable
    global loaded_config_array
    # Clear rendered_templates at the start of each call
    loaded_config_array = []     # stores already-loaded script IDs
    rendered_templates = []

    # Get resource path
    resource_path = get_resource_path(path,run_results)
    print("Updating path:", resource_path)

    # Show/hide logic
    show = True
    for suffix in PATH_SUFFIXES:
        if path.endswith(f".{suffix}"):
            show = False
            break

    if show:
        print("Show findings & paging buttons")
    else:
        print("Hide findings & paging buttons")

    # # Update title
    # if path.endswith(".items"):
    #     title = get_value_at(path.replace("items", "description"), run_results)
    #     update_title(title)
    # else:
    #     title = make_title_acl(resource_path)
    #     update_title(title)

    # Simulated clearing of highlighting
    print("Clearing path",path)

    # DOM update simulation
    if path == "":
        #show_main_dashboard()
        print("path is empty")
    elif path.endswith(".items"):
        # Findings view
        lazy_loading_json(resource_path,run_results)
        # hide_all()
        # hide_items(resource_path)
        # hide_links(resource_path)
        # show_row(resource_path)
        # show_findings(path, resource_path)
        # current_resource_path = resource_path
        # show_filters(resource_path)
    elif lazy_loading_json(resource_path) == 0:
        print(resource_path + " has already been loaded")

        # if path.endswith(".view"):
        #     hide_items(current_resource_path)
        #     show_single_item(path)
        # elif current_resource_path and re.match(current_resource_path.replace(".id.", r"\.[^.]+\."), resource_path):
        #     hide_items(current_resource_path)
        #     show_items(path)
        # else:
        #     print("Switching view to", resource_path)
        #     hide_all()
        #     show_row_with_items(resource_path)
        #     current_resource_path = resource_path
    else:
        print("View was updated via lazyloading")
        # show_filters(resource_path)
        # current_resource_path = resource_path

    print("Scroll to top (simulated)")
    return rendered_templates

def get_resource_path(path: str,run_results) -> str:
    global current_resource_path

    if path.endswith(".items"):
        resource_path = get_value_at(path.replace("items", "display_path"),run_results)
        if resource_path is None:
            resource_path = get_value_at(path.replace("items", "path"),run_results)
        if not resource_path:
            return "services.unknown"

        resource_path_array = resource_path.split(".")
        resource_path_array.pop()  # drop last element
        resource_path = "services." + ".".join(resource_path_array)
    elif path.endswith(".view"):
        # same resource, do not change
        resource_path = current_resource_path
    else:
        resource_path = path

    return resource_path


def get_value_at(path: str,run_results):
    return get_value_at_recursive(path, run_results)


def get_value_at_recursive(path: str, source: dict):
    value = source
    current_path = path

    while current_path:
        if "." in current_path:
            key = current_path.split(".", 1)[0]
        else:
            key = current_path

        try:
            if key == "id":
                # path contains ".id"
                v = []
                for k, val in value.items():
                    # build new path (everything after .id)
                    suffix = (
                        current_path[current_path.index(".") :] if "." in current_path else ""
                    )
                    w = get_value_at_recursive(k + suffix, value)
                    # merge values
                    if isinstance(w, dict):
                        v.extend(list(w.values()))
                    elif isinstance(w, list):
                        v.extend(w)
                    else:
                        v.append(w)
                return v
            else:
                value = value[key]
        except Exception as err:
            print("Error while traversing:", err)
            return None

        # move to next part of path
        if "." in current_path:
            current_path = current_path.split(".", 1)[1]
        else:
            current_path = None

    return value


def lazy_loading_json(path: str,run_results):
    """Figure out number of columns (cols) based on metadata, then call load_config."""
    cols = 1
    resource_path_array = path.split(".")
    service = resource_path_array[1]
    resource_type = resource_path_array[-1]

    for group, group_data in run_results.get("metadata", {}).items():
        if service in group_data:
            resources = group_data[service].get("resources", {})
            if resource_type in resources:
                cols = resources[resource_type].get("cols", 1)
            break

    return load_config(path, cols,run_results)


def load_config(script_id: str, cols: int,run_results):
    """Mimics the JS loadConfig logic, but in Python."""
    if not script_id.endswith(".external_attack_surface"):
        print(f"Script ID: {script_id}")

        # Abort if already loaded
        if script_id in loaded_config_array:
            print("Data was already loaded")
            return 0

        path_array = script_id.split(".")

        # Replace every 2nd element starting from index 3 with 'id'
        for i in range(3, len(path_array), 2):
            path_array[i] = "id"
        fixed_path = ".".join(path_array)
        if fixed_path in loaded_config_array:
            print(f"Fixed path: {fixed_path}")
            print("ID was already substituted")
            return 0

        path_array[1] = "id"
        fixed_path = ".".join(path_array)
        if fixed_path in loaded_config_array:
            # Special case for services.id.findings
            return 0

    list_data = run_results
    path_array = script_id.split(".id.")[0].split(".")

    for i, part in enumerate(path_array):
        if part.endswith("-filters"):
            part = part.replace("-filters", "")

        # ✅ Safely check if key exists before accessing
        if isinstance(list_data, dict):
            if part in list_data:
                list_data = list_data[part]
            else:
                # Key missing -> return empty
                return {}
        else:
            # Not a dict anymore, stop
            return {}

        if part == "items" and i > 3 and path_array[i - 2] == "filters":
            return 1

        if part == "items" and i > 3 and path_array[i - 2] == "filters":
            return 1
            
    # Default # of columns = 2
    if cols is None:
        cols = 2

    if cols == 0:
        # Metadata
        script_id = script_id.replace("services.id.", "")
        #process_template(f"{script_id}.list.template", f"{script_id}.list", list_data)
        process_template(f"{script_id}", f"{script_id}.list", list_data)
    elif cols == 1:
        # Single-column display
        #process_template(f"{script_id}.details.template", "single-column", list_data)
        process_template(f"{script_id}", "single-column", list_data)
    elif cols == 2:
        # Double-column display
        # process_template(f"{script_id}.list.template", "double-column-left", list_data)
        # process_template(f"{script_id}.details.template", "double-column-right", list_data)
        process_template(f"{script_id}", "double-column-right", list_data)
    # Track loaded data
    if script_id not in loaded_config_array:
        loaded_config_array.append(script_id)

    return 1


def process_template(template_id: str, container_id: str, data):
    """
    Instead of compiling Handlebars + writing to DOM,
    just store the call details in a global variable.
    """
    record = {
        "template_id": template_id,
        "container_id": container_id,
        "data": data,
    }
    rendered_templates.append(record)





