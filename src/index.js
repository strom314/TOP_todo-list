import { domManager } from "./domManager";
import { Project } from "./project";
import { projectManager } from "./projectManager";
import "./style.css";

projectManager.createProject("projekt1");
const projekt1 = projectManager.projects[0];
projekt1.createTask("pes", "psy psy", "idk", 2);
projekt1.createTask("kocka", "macky macky", "idk", 1);
projekt1.createTask("kralik", "zajace zajace", "idk", 3);

console.log(projekt1.name);
projekt1.rename("Novy nazov");
console.log(projekt1.name);

console.log(projekt1.tasks);
projekt1.deleteTask("kocka");
console.log(projekt1.tasks);
projekt1.editTask("kralik", "novy pes", "nove psy psy", "new idk", 5);

domManager.displayProjects();
domManager.displayTasks(projekt1);
