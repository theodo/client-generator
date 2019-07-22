import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";

export default class extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates("react-common/", [
      // actions
      "actions/foo/create.ts",
      "actions/foo/delete.ts",
      "actions/foo/list.ts",
      "actions/foo/update.ts",
      "actions/foo/show.ts",

      // utils
      "utils/dataAccess.ts",

      // reducers
      "reducers/foo/create.ts",
      "reducers/foo/delete.ts",
      "reducers/foo/index.ts",
      "reducers/foo/list.ts",
      "reducers/foo/update.ts",
      "reducers/foo/show.ts"
    ]);

    this.registerTemplates(`react/`, [
      // components
      "components/foo/Create.tsx",
      "components/foo/Form.tsx",
      "components/foo/index.tsx",
      "components/foo/List.tsx",
      "components/foo/Update.tsx",
      "components/foo/Show.tsx",

      //style
      "components/foo/components.style.tsx",

      // routes
      "routes/foo.tsx"
    ]);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();

    console.log(
      'Code for the "%s" resource type has been generated!',
      resource.title
    );
    console.log(
      "Paste the following definitions in your application configuration (`client/src/index.js` by default):"
    );
    console.log(
      chalk.green(`
// import reducers
import ${titleLc} from './reducers/${titleLc}/';

//import routes
import ${titleLc}Routes from './routes/${titleLc}';

// Add the reducer
combineReducers({ ${titleLc},/* ... */ }),

// Add routes to <Switch>
{ ${titleLc}Routes }
`)
    );
  }

  generate(api, resource, dir) {
    const lc = resource.title.toLowerCase();
    const titleUcFirst =
      resource.title.charAt(0).toUpperCase() + resource.title.slice(1);

    const context = {
      title: resource.title,
      name: resource.name,
      lc,
      uc: resource.title.toUpperCase(),
      fields: resource.readableFields,
      formFields: this.buildFields(resource.writableFields),
      hydraPrefix: this.hydraPrefix,
      titleUcFirst
    };

    // Create directories
    // These directories may already exist
    [`${dir}/utils`, `${dir}/config`, `${dir}/routes`].forEach(dir =>
      this.createDir(dir, false)
    );

    [
      `${dir}/actions/${lc}`,
      `${dir}/components/${lc}`,
      `${dir}/reducers/${lc}`
    ].forEach(dir => this.createDir(dir));

    [
      // actions
      "actions/%s/create.ts",
      "actions/%s/delete.ts",
      "actions/%s/list.ts",
      "actions/%s/update.ts",
      "actions/%s/show.ts",

      // components
      "components/%s/Create.tsx",
      "components/%s/Form.tsx",
      "components/%s/index.tsx",
      "components/%s/List.tsx",
      "components/%s/Update.tsx",
      "components/%s/Show.tsx",

      //style
      "components/%s/components.style.tsx",

      // reducers
      "reducers/%s/create.ts",
      "reducers/%s/delete.ts",
      "reducers/%s/index.ts",
      "reducers/%s/list.ts",
      "reducers/%s/update.ts",
      "reducers/%s/show.ts",

      // routes
      "routes/%s.tsx"
    ].forEach(pattern => this.createFileFromPattern(pattern, dir, lc, context));

    // utils
    this.createFile(
      "utils/dataAccess.ts",
      `${dir}/utils/dataAccess.ts`,
      context,
      false
    );

    this.createEntrypoint(`${api.entrypoint}`, `${dir}/config/entrypoint.ts`);
  }
}
