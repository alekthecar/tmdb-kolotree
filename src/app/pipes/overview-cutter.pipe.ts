import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "overviewCutter"
})
export class OverviewCutterPipe implements PipeTransform {
  transform(movieOverview: string, wordCount: number): any {
    let words = movieOverview.split(" ");
    if (words.length <= wordCount) {
      return movieOverview;
    }
    return words.slice(0, wordCount).join(" ") + "...";
  }
}
