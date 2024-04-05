import { Component, Injector, inject } from "@angular/core";
import {
  NgElement,
  WithProperties,
  createCustomElement,
} from "@angular/elements";
import * as Highcharts from "highcharts";
import { DemoComponent } from "../demo/demo.component";
import { isNil } from "../utils/utils";
import * as dayjs from "dayjs";

import Accessibility from "highcharts/modules/accessibility";
import SeriesLabel from "highcharts/modules/series-label";
Accessibility(Highcharts);
SeriesLabel(Highcharts);

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
})
export class ParentComponent {
  private injector = inject(Injector);

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = "chart";
  chartOptions: Highcharts.Options = {};
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  constructor() {
    this.defineDemoElement();

    if (Highcharts && Highcharts.AST) {
      Highcharts.AST.allowedTags = [
        ...Highcharts.AST.allowedTags,
        "demo-element",
      ];
    }
  }

  ngOnInit() {
    const demoEl: NgElement & WithProperties<DemoComponent> =
      document.createElement("demo-element") as any;

    const initDate = dayjs();
    const data = new Array(400).fill(null).map((el, index) => {
      return {
        x: initDate.clone().add(index, "days").toDate().getTime(),
        y: Math.floor(Math.random() * 100),
      };
    });

    this.chartOptions = {
      title: {
        text: demoEl.outerHTML,
        align: "left",
        useHTML: true,
      },
      xAxis: [
        {
          type: "datetime",
          labels: {
            format: "{value:%a %H} Uhr",
          },
          crosshair: true,
          title: {
            text: demoEl.outerHTML,
            useHTML: true,
          },
        },
      ],
      yAxis: [
        {
          labels: {
            format: "{value}",
          },
          title: {
            text: demoEl.outerHTML,
            useHTML: true,
          },
        },
      ],
      legend: {
        useHTML: true,
      },
      tooltip: {
        useHTML: true,
        style: {},
      },
      series: [
        {
          name: `<div style="display: inline">${demoEl.outerHTML}</div>`,
          showInLegend: true,
          type: "spline",
          data: data,
          marker: {
            enabled: false,
          },
        },
      ],
    };
  }

  private defineDemoElement() {
    if (isNil(customElements.get("demo-element"))) {
      const demoElement = createCustomElement(DemoComponent, {
        injector: this.injector,
      });
      customElements.define("demo-element", demoElement);
    }
  }
}
