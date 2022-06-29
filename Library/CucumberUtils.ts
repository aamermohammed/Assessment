
 const {BeforeAll, setDefaultTimeout} = require("cucumber");
 import {Constants} from "../Library/Constants";

 BeforeAll(async function () {
    setDefaultTimeout(new Constants().testScriptWait);
});
