import { AppContextType } from "@components/context";

export default class Skill {
  constructor() {}
  public preview() {
    console.log("hi");
  }
  public showAll() {
    console.log("showAllSkill");
  }
  public showPreview() {
    console.log("showAllSkill");
  }
  public showAllDetails() {
    console.log("showAllDetails");
  }
  public showSkill(context:AppContextType,args:string[]) {
    console.log("showSkill",args);
  }
  public cat(context:AppContextType,args:string[]) {
    console.log("cat",args);
  }
  public catWithDetails(context:AppContextType,args:string[]) {
    console.log("catWithDetails",args);
  }
}
