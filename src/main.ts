import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import * as Highcharts from "highcharts";

if (Highcharts && Highcharts.AST) {
  Highcharts.AST.allowedTags = [...Highcharts.AST.allowedTags, "demo-element"];
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
