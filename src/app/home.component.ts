import { Component, VERSION, Sanitizer } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public selected: boolean = false;
  constructor(private router: Router, private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry) {
     iconRegistry.addSvgIcon(
      "algorithm",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Ramya-06/angular-spark720-homepage/master/src/content/images/algorithm.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "workflow",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Ramya-06/angular-spark720-homepage/master/src/content/images/workflow.svg"
      )
    );

    console.log("Home page");
  }
  name = "Angular " + VERSION.major;

  selectedCard(e: Event) {
    this.selected = true;

    this.router.navigate([".", {}]);
    console.log(e);
  }
}
