PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff()
    // PennController.AddHost("https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/");; // loads pictures from external server (pre-test 3 only)
    
    var progressBarText = "Verbleibend"; //Changes the text of the progress bar

/* To run this script, you need...
1. to have Subsequence.js in your js_includes and global_z.css in your css_includes
2. the right list .csv file in PennController.Template
3. the right yes key (F or J) in place of X in: .log("yes_key", variable.yes_X) and the right Instructions as to which key means 'Yes' and 'No' in:
   -PC 2. 2. Intro/instructions
     -newText("intro_instructions3
   -PC 3. instructions_example_name2
     -.test.pressed("X")
     -instructions_example_year2
     -instructions_example_fact2
     -.log( "yes_key" , variable.yes_X)
   -PC 4. Instructions before experiment
     -intro_experiment2
     -newKey("continue", "X")
   -Pc 5. Experimental trials
     -.test.pressed("X")
     -.log( "yes_key" , variable.yes_X)
   -PC  6. Break
     -newKey("continue_Ja", "X")
4. the right column names depending on list in the Recollection Task
*/

// Start typing your code here

// Establish sequence, with randomised items
// shuffle(randomize("real"), randomize("filler"))
PennController.Sequence("demographics", "instructions1", "practice_trials", "instructions2", subsequence(repeat(randomize("critical_trials"), 2) , "break"), "post-task-intro", "post-task", "send" , "final" ); // Subsequence.js is needed to run this line
//PennController.Sequence( "post-task", "send" , "final" ); // Subsequence.js is needed to run this line

//====================================================================================================================================================================================================================

// 1. Welcome page/demographics
PennController("demographics",
               newText("welcometext", "<p><b>Herzlich willkommen zu unserem Experiment!</b><p> <p>Um an unserem Experiment teilnehmen zu k&ouml;nnen, ben&ouml;tigen wir Angaben zu Ihrer Person. Diese werden anonym ausgewertet. Genauere Informationen entnehmen Sie bitte dem Informationsblatt f&uuml;r Proband*innen.<p>")              
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add(0, 0, getText("welcometext") )
               .print()
               ,
               newDropDown("age", "")
               .settings.add( "17 oder junger" , "18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31" , "32 oder &auml;lter" )
               ,
               newText("agetext", "Alter:")
               .settings.css("font-size", "20px")
               .settings.bold()
               //.settings.after( getDropDown("age") )    
               ,
               newCanvas("agecanvas", 1000, 45)
               .settings.add(0, 10, getText("agetext") )
               .settings.add(100, 8, getDropDown("age") )
               .print()    
               ,
               newText("Geschlecht", "Geschlecht:")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newDropDown("sex", "" )
               .settings.add( "&nbsp;weiblich&nbsp;", "&nbsp;m&auml;nnlich&nbsp;", "&nbsp;divers&nbsp;")
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("Geschlecht") )
               .settings.add(120, 3, getDropDown("sex") )
               .print()
               ,
               newText("SpracheTest", "Haben Sie bis zum 5. Lebensjahr au&szlig;er Deutsch eine weitere Sprache gelernt?")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newTextInput("und zwar", "")
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("und zwar") )
               ,
               newDropDown("language", "")
               .settings.log()
               .settings.add(  "nein", "ja, und zwar:")    
               .settings.after(  getText("label input") )
               .settings.callback(                                             //whenever an option is selected, do this:
                   getDropDown("language")
                   .test.selected("ja, und zwar:")                             //reveal the input box
                   .success( getTextInput("und zwar").settings.visible() )     //hide the input box
                   .failure( getTextInput("und zwar").settings.hidden()  )   
               )        
               ,
               newCanvas("languagecanvas", 1000, 25)
               .settings.add(0, 0, getText("SpracheTest") )
               .settings.add(690, 2, getDropDown("language") )
               .print()
               ,
               newText("<p> ")
               .print()
               ,    
               newText("information", "<p>Bevor das Experiment beginnen kann, sollten Sie das <a href='https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/documentation/probanden_info_ONLINE_LifeFact.pdf' target='_blank' >Probandeninformationsblatt</a> sowie die <a href='https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/documentation/einversta%CC%88ndnis_ONLINE_LifeFact.pdf' target='_blank' >Einwilligungserkl&auml;rung</a> lesen.<p>")    
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvastwo", 1000, 80)
               .settings.add(0, 0, getText("information") )
               .print()
               ,
               newText("browser_info", "<p>Bitte beachten Sie, dass dieses Experiment nur mit den Browsern <b>Mozilla Firefox</b> und <b>Google Chrome</b> getestet wurde und nicht auf mobilen Ger&auml;ten funktioniert.<p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvasthree", 1000, 115)
               .settings.add(0, 0, getText("browser_info") )
               .print()
               ,
               newButton("okay", "Ich habe das Probandeninformationsblatt sowie die Einwilligungserkl&auml;rung gelesen und erkl&auml;re mich mit diesen einverstanden.")
               .settings.css("font-size", "15px")        
               .print()
               .wait()  
               ,
               newText("<p> ")
               .print()  
               ,
               newButton("start", "Experiment beginnen")
               .settings.center()  
               ,
               getDropDown("age")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte geben Sie Ihr Alter an.")
                   .settings.color("red")
                   .print())   
               ,
               getDropDown("sex")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte geben Sie Ihr Geschlecht an.")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("language")
               .test.selected()
               .success()
               .failure(
                   newText("Bitte beantworten Sie die Frage zum Spracherwerb.")                   
                   .settings.color("red")
                   .print())      
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getButton("start")
               .print()
               .wait()
               ,   
               newVar("IDage")
               .settings.global()
               .set( getDropDown("age") )
               ,
               newVar("IDsex")
               .settings.global()
               .set( getDropDown("sex") )
               ,
               newVar("IDling")
               .settings.global()
               .set( getDropDown("language") )
               ,
               newVar("IDund zwar")
               .settings.global()
               .set( getTextInput("und zwar") )
              )  
    
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("IDund zwar"))
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);        //end of welcome screen

//====================================================================================================================================================================================================================
// 2. Intro/instructions

PennController( "instructions1" ,
                newText("intro_instructions", "<p><b>Vielen Dank, dass Sie an diesem Experiment teilnehmen!</b><p> <p>In diesem Experiment werden Sie die Namen verschiedener ber&uuml;hmter Pers&ouml;nlichkeiten sehen und Fragen zu diesen beantworten.<p> ")
                .settings.css("font-size", "20px")
                ,
                newText("intro_instructions2", "<p>Legen Sie Ihren <b>linken Zeigefinger</b> auf die Taste '<b>F</b>' und Ihren <b>rechten Zeigefinger</b> auf die Taste '<b>J</b>'.<p>")
                .settings.css("font-size", "20px")
                .settings.color("red")
                ,
                // F-Version:
                //newText("intro_instructions3", "<p>Sobald ein Name erscheint, dr&uuml;cken Sie <b>mit dem linken Zeigefinger = 'Ja'</b>, falls Sie diese Person kennen, und <b>mit dem rechten Zeigefinger = 'Nein'</b>, falls Sie diese Person nicht kennen.<p> <p>Werden Sie 'Am Leben?' gefragt, antworten Sie, ob Sie glauben, dass diese Person noch am Leben ist: <b>linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b><p> <p>Danach werden Sie eine Jahreszahl sehen. Antworten Sie, ob Sie glauben, dass diese Person im genannten Jahr am Leben war: <b> linker Zeigefinger = 'Ja'/ rechter Zeigefinger = 'Nein'</b><p> <p>Zuletzt wird Ihnen ein Gegenstand gezeigt und Sie werden gefragt, ob Sie die Person mit diesem Gegenstand assoziieren k&ouml;nnen. Dr&uuml;cken Sie auch hier: <b> linker Zeigefinger = 'Ja' / rechter Zeigefinger = 'Nein'</b>.<p>")
                // J-Version:
                newText("intro_instructions3", "<p>Sobald ein Name erscheint, dr&uuml;cken Sie <b>mit dem linken Zeigefinger = 'Nein'</b>, falls Sie diese Person nicht kennen, und <b>mit dem rechten Zeigefinger = 'Ja'</b>, falls Sie diese Person kennen.<p> <p>Werden Sie 'Am Leben?' gefragt, antworten Sie, ob Sie glauben, dass diese Person noch am Leben ist: <b>linker Zeigefinger = 'Nein' / rechter Zeigefinger = 'Ja'</b><p> <p>Danach werden Sie eine Jahreszahl sehen. Antworten Sie, ob Sie glauben, dass diese Person im genannten Jahr am Leben war: <b> linker Zeigefinger = 'Nein'/ rechter Zeigefinger = 'Ja'</b><p> <p>Zuletzt wird Ihnen ein Gegenstand gezeigt und Sie werden gefragt, ob Sie die Person mit diesem Gegenstand assoziieren k&ouml;nnen. Dr&uuml;cken Sie auch hier: <b> linker Zeigefinger = 'Nein' / rechter Zeigefinger = 'Ja'</b>.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas",900, 480)
                .settings.add(0,0, getText("intro_instructions"))
                .settings.add(0,110, getText("intro_instructions2"))
                .settings.add(0,150, getText("intro_instructions3"))
                .print()
                ,
                newButton("weiter", "Weiter")
                .settings.center()
                .print()
                .wait()
                ,
                getCanvas("introcanvas")
                .remove()
                ,
                getButton("weiter")
                .remove()
                ,
                newText("intro_instructions4", "<p>Wenn Sie die anschlie&szlig;enden Fragen zur Person nicht beantworten k&ouml;nnen, <b>dr&uuml;cken Sie keine Tasten!</b> Das Experiment geht nach 5 Sekunden automatisch weiter.<p>")
                .settings.css("font-size", "20px")
                .settings.color("red")
                ,
                newText("intro_instructions5", "<p>Um Ihnen den Einstieg zu erleichtern, blenden wir Ihnen die Anweisungen w&auml;hrend der Beispielrunde in <b>Rot</b> ein. F&uuml;r das tats&auml;chliche Experiment bekommen Sie aber nur die W&ouml;rter und Jahre gezeigt.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas2", 900, 220)
                .settings.add(0,0, getText("intro_instructions4"))
                .settings.add(0,110, getText("intro_instructions5"))
                .print()
                ,
                newButton("beispiel_beginnen", "Beispiele beginnen")
                .settings.center()
                .print()
                .wait()
               )
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 3. Practice round

PennController. Template( PennController.GetTable( "practice.csv"),
                          variable => PennController( "practice_trials",
                                                      newText ("instructions_example_name","Ihnen bekannt?<p>")
                                                      .settings.css("font-size", "20px")
                                                      .settings.center()
                                                      .settings.color("red")
                                                      .print()
                                                      ,
                                                      newText("example_name","<br>"+  variable.name)
                                                      .settings.css("font-size", "25px")
                                                      .settings.center()
                                                      .settings.bold()
                                                      .print()
                                                      ,
                                                      // F-Version:  
                                                      //newText ("instructions_example_name2"," <p><b>links = 'Ja' / rechts = 'Nein'</b><p>")
                                                      //J-Version:
                                                      newText ("instructions_example_name2"," <p><b>links = 'Nein' / rechts = 'Ja'</b><p>")
                                                      .settings.css("font-size", "20px")
                                                      .settings.center()
                                                      .settings.color("red")
                                                      .print()
                                                      ,
                                                      newTimer("delay", 500)    //no button can be pressed before 500ms
                                                      .start()
                                                      .wait()
                                                      ,                           
                                                      newKey("q_example_name", "FJ")
                                                      .settings.log()
                                                      .wait()                                   
                                                      ,
                                                      getText("example_name")
                                                      .remove()
                                                      ,
                                                      getText("instructions_example_name")
                                                      .remove()
                                                      ,
                                                      getText ("instructions_example_name2")
                                                      .remove()
                                                      ,
                                                      getKey("q_example_name")
                                                      .remove()
                                                      ,
                                                      getKey("q_example_name")
                                                      //F-Version:
                                                      //.test.pressed("F")
                                                      //J-Version:
                                                      .test.pressed("J")
                                                      .success
                                                      (      
                                                          
                                                          newText ("instructions_example_alive", "Noch am Leben?<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_alive", "<br> Am Leben?" )
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()                                                          
                                                          .print()                                                    
                                                          ,
                                                          //F-Version:  
                                                          //newText ("instructions_example_alive2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          newText ("instructions_example_alive2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,                                                           
                                                          newTimer("delay2", 200)     //no button can be pressed before 200ms
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_alive", "FJ")
                                                          .callback( getTimer("time_out").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("example_alive")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_alive")
                                                          .remove()                                                         
                                                          ,
                                                          getText("instructions_example_alive2")
                                                          .remove()                                                         
                                                          ,  
                                                          getKey("q_example_alive")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_year", "Im genannten Jahr am Leben?<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_year", "<br>"+ variable.year)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()  
                                                          ,
                                                          //F-Version:
                                                          //newText ("instructions_example_year2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          newText ("instructions_example_year2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay3", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_year", "FJ")
                                                          .callback( getTimer("time_out2").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out2", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("example_year")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_year")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_year2")
                                                          .remove()
                                                          ,  
                                                          getKey("q_example_year")
                                                          .remove()
                                                          ,
                                                          newText ("instructions_example_fact", "Hat die Person damit zu tun?<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newText("example_fact", "<br>" + variable.fact)
                                                          .settings.css("font-size", "25px")
                                                          .settings.center()
                                                          .print()                                                    
                                                          ,
                                                          //F-Version:
                                                          //newText ("instructions_example_fact2", "<br><p><b>links = 'Ja' / rechts = 'Nein'</b><p>")  
                                                          //J-Version:
                                                          newText ("instructions_example_fact2", "<br><p><b>links = 'Nein' / rechts = 'Ja'</b><p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newTimer("delay4", 500)
                                                          .start()
                                                          .wait()
                                                          ,
                                                          newKey("q_example_fact", "FJ")
                                                          .callback( getTimer("time_out3").stop() )
                                                          .log("all")  
                                                          ,
                                                          newTimer("time_out3", 5000)
                                                          .start()
                                                          .log()
                                                          .wait()
                                                          ,
                                                          getText("instructions_example_fact")
                                                          .remove()
                                                          ,
                                                          getText("example_fact")
                                                          .remove()
                                                          ,
                                                          getText("instructions_example_fact2")
                                                          .remove()
                                                          ,
                                                          getKey("q_example_fact")
                                                          .remove()                                                          
                                                          ,
                                                          newText ("instructions_continue", "<p>Dr&uuml;cken Sie bitte die <b>Leertaste</b>, um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")                                                        
                                                          .print()
                                                          ,
                                                          newKey("continue" ," ")
                                                          .print()
                                                          .wait()
                                                          ,
                                                          getText("instructions_continue")
                                                          .remove()
                                                          ,  
                                                          getKey("continue")
                                                          .remove()
                                                          
                                                      )
                                                      .failure
                                                      (
                                                          newText ("failure", "<p>Wenn Sie den Namen nicht kennen, machen Sie mit dem n&auml;chsten Namen weiter.<p>")
                                                          .settings.css("font-size", "20px")
                                                          .settings.color("red")
                                                          .settings.center()  
                                                          .print()   
                                                          ,
                                                          newText ("instructions_continue2", "<p>Dr&uuml;cken Sie bitte die <b>Leertaste</b>, um weiter fortzufahren.<p>")  
                                                          .settings.css("font-size", "20px")
                                                          .settings.center()  
                                                          .settings.color("red")
                                                          .print()
                                                          ,
                                                          newKey("continue2" ," ")
                                                          .print()
                                                          .wait()
                                                          ,
                                                          getText("instructions_continue2")
                                                          .remove()
                                                          ,  
                                                          getKey("continue2")
                                                          .remove()  
                                                          
                                                      ))                            
                          .log( "item" , variable.item )
                          .log( "type" , variable.type )              // 20.04.2020 DP changed from "pratice_trial" to "type"
                          .log( "version" , variable.version)
                          .log( "letter" , variable.letter)
                          .log( "sentence" , variable.sentence)
                          .log( "name" , variable.name)  
                          .log( "year" , variable.year)
                          .log( "fact" , variable.fact)
                          .log( "full_sentence" , variable.full_sentence)
                          .log( "condition" , variable.condition)
                          .log( "life_mismatch" , variable.life_mismatch)
                          .log( "fact_mismatch" , variable.fact_mismatch)
                          .log( "list" , variable.list)
                          .log( "yes_key" , variable.yes_J)
                          .log( "occupation" , variable.occupation)
                          
                          .log("age", getVar("IDage"))
                          .log("sex", getVar("IDsex"))
                          .log("L2", getVar("IDling"))
                          .log("whichL2", getVar("IDund zwar"))
                          
                          .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
                          .setOption("hideProgressBar", true)
                         );

//====================================================================================================================================================================================================================
// 4. Instructions before experiment
PennController( "instructions2" ,
                newText("intro_experiment", "<p>Jetzt wird das Experiment beginnen. Es wird ungef&auml;hr 10 bis 15 Minuten dauern. Ihnen wird immer zuerst ein Name gezeigt und anschlie&szlig;end die Frage 'Am Leben?', ein Jahr und ein Gegenstand.<p> <p><br>Anworten Sie bitte: <p><b>1. ob Sie die Person kennen,<p> <p>2. ob die Person noch am Leben ist, <p> <p>3. ob die Person im genannten Jahr am leben war,</b> und zuletzt,<p> <p><b>4. ob Sie die Person mit dem Gegenstand assoziieren k&ouml;nnen.</b><p>")
                .settings.css("font-size", "18px")
                ,
                //F-Version:
                //newText("intro_experiment2", "<p>Antworten Sie immer <b>mit dem linken Zeigefinger = 'Ja'</b> und <b>mit dem rechten Zeigefinger = 'Nein'</b>.<br><p>Wenn Sie die anschlie&szlig;enden Fragen zur Person nicht beantworten k&ouml;nnen, <b>dr&uuml;cken Sie keine Tasten!</b> Das Experiment geht nach 5 Sekunden automatisch weiter.<p>")
                //J-Version:
                newText("intro_experiment2", "<p>Antworten Sie immer <b>mit dem linken Zeigefinger = 'Nein'</b> und <b>mit dem rechten Zeigefinger = 'Ja'</b>.<br><p>Wenn Sie die anschlie&szlig;enden Fragen zur Person nicht beantworten k&ouml;nnen, <b>dr&uuml;cken Sie keine Tasten!</b> Das Experiment geht nach 5 Sekunden automatisch weiter.<p>")
                .settings.css("font-size", "18px")
                .settings.color("red")
                ,
                newText("intro_experiment2_1","<p>Bitte beachten Sie au&szlig;erdem, dass w&auml;hrend des Experiments keine Anweisungen in Rot eingeblendet sind, sondern nur die W&ouml;rter und Jahre gezeigt werden.<p>")
                .settings.css("font-size", "18px")
                ,
                newText("intro_experiment3", "<p>Nachdem Sie die H&auml;lfte der Fragen beantwortet haben, wird es eine kurze Pause von 20 Sekunden geben. Nutzen Sie diese, um sich kurz zu entspannen oder die Augen vom Bildschirm zu nehmen. Viel Spa&szlig;!</p>")
                .settings.css("font-size", "18px")        
                ,
                newCanvas("instructions_canvas", 900, 600)
                .settings.add(0, 0, getText("intro_experiment") )
                .settings.add(0, 300, getText("intro_experiment2") )
                .settings.add(0, 400, getText("intro_experiment2_1") )
                .settings.add(0, 475, getText("intro_experiment3") )
                .print()    
                ,
                newButton("start_experiment3" ,"Experiment beginnen")
                .settings.center()
                .print()
                .wait()
                ,
                getCanvas("instructions_canvas")
                .remove()
                ,
                getButton("start_experiment3")
                .remove()
                ,
                newText("instructions_key", "<br><b>Legen Sie Ihre Zeigefinger auf die Tasten und dr&uuml;cken Sie die 'Ja-Taste', um  das Experiment zu beginnen.</b></br>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                //F-Version:
                //newKey("continue", "F")
                //J-Version:
                newKey("continue", "J")
                .wait()
                ,  
                getText("instructions_key")
                .remove()
                ,
                newTimer(1000)
                .start()
                .wait()
               )                                //end of experiment instructions screen  
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);  

//====================================================================================================================================================================================================================
// 5. Experimental trials

PennController.Template( PennController.GetTable( "stimuli.csv"),  // change this line for the appropriate experimental list
                         variable => PennController( "critical_trials",
                                                     newText("question1", variable.name)
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("delay5", 300)
                                                     .start()
                                                     .wait()
                                                     ,                           
                                                     newKey("question_name", "FJ")
                                                     .settings.log()
                                                     .wait()                                   
                                                     ,
                                                     getText("question1")
                                                     .remove()
                                                     ,  
                                                     getKey("question_name")
                                                     .remove()
                                                     ,   
                                                     getKey("question_name")
                                                     //F-Version:
                                                     //.test.pressed("F")
                                                     //J-Version:
                                                     .test.pressed("J")
                                                     .success
                                                     (  
                                                         
                                                         newText("question2","Am Leben?" )
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()                                                    
                                                         ,
                                                         newTimer("delay6", 200)
                                                         .start()
                                                         .wait()
                                                         ,                                                         
                                                         newKey("question_alive", "FJ")
                                                         .callback( getTimer("time_out4").stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out4", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,                                                         
                                                         getText("question2")
                                                         .remove()
                                                         ,  
                                                         getKey("question_alive")
                                                         .remove()                                   
                                                         ,                         
                                                         newText("question3", variable.year)
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()  
                                                         ,                   
                                                         newTimer("delay7", 500)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newKey("question_year", "FJ")
                                                         .callback( getTimer("time_out5").stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out5", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,
                                                         getText("question3")
                                                         .remove()
                                                         ,  
                                                         getKey("question_year")
                                                         .remove()
                                                         ,                         
                                                         newText("question4", variable.fact)
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .print()                                                    
                                                         ,                          
                                                         newTimer("delay8", 500)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         newKey("question_fact", "FJ")
                                                         .callback( getTimer("time_out6").stop() )
                                                         .log("all")  
                                                         ,
                                                         newTimer("time_out6", 5000)
                                                         .start()
                                                         .log()
                                                         .wait()
                                                         ,
                                                         getText("question4")
                                                         .remove()
                                                         ,  
                                                         getKey("question_fact")
                                                         .remove()
                                                         ,                             
                                                         newText("pleasewait", "...")
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .settings.bold()
                                                         .print()
                                                         ,
                                                         newTimer("wait", 1000)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         getText("pleasewait")
                                                         .remove()
                                                         
                                                     )
                                                     .failure
                                                     (
                                                         
                                                         newText("pleasewait2", "...")
                                                         .settings.css("font-size", "25px")
                                                         .settings.center()
                                                         .settings.bold()
                                                         .print()
                                                         ,
                                                         newTimer("wait2", 1000)
                                                         .start()
                                                         .wait()
                                                         ,
                                                         getText("pleasewait2")
                                                         .remove()                                                          
                                                     ))                            
                         .log( "item" , variable.item )
                         .log( "type" , variable.type )              // 20.04.2020 DP changed from "pratice_trial" to "type"
                         .log( "version" , variable.version)
                         .log( "letter" , variable.letter)
                         .log( "sentence" , variable.sentence)
                         .log( "name" , variable.name)  
                         .log( "year" , variable.year)
                         .log( "fact" , variable.fact)
                         .log( "full_sentence" , variable.full_sentence)
                         .log( "condition" , variable.condition)
                         .log( "life_mismatch" , variable.life_mismatch)
                         .log( "fact_mismatch" , variable.fact_mismatch)
                         .log( "list" , variable.list)
                         .log( "life_status" , variable.life_status)
                         .log( "yes_key" , variable.yes_J)
                         .log( "occupation" , variable.occupation)         
                         .log("age", getVar("IDage"))
                         .log("sex", getVar("IDsex"))
                         .log("L2", getVar("IDling"))
                         .log("whichL2", getVar("IDund zwar"))
                        );

//====================================================================================================================================================================================================================
// 6. Break

PennController( "break" ,
                newText("break_text", "<p><b>Zeit f&uuml;r eine kleine Pause!</b> <br><p>Dr&uuml;cken Sie die Leertaste, um fortzufahren, oder entspannen Sie sich und nehmen Sie kurz die Augen vom Bildschirm.<br><p><b>Das Experiment geht nach 20 Sekunden automatisch weiter.</br></b><p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br><b>Legen Sie Ihre Zeigefinger auf die Tasten und dr&uuml;cken Sie die 'Ja-Taste', um  das Experiment zu beginnen.</b></br>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                //F-Version:
                //newKey("continue_Ja", "F")
                //J-Version:
                newKey("continue_Ja", "J")
                .wait()
                ,  
                getText("instructions_key2")
                .remove()                  
                ,
                newTimer(1000)
                .start()
                .wait()             
               )    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 7. Comprehension test explanation screen // 14.05.2020 PM added and changed numbering; should this count towards progress?

PennController( "post-task-intro",
                newText("comp1_1", "<p>Der haupts&auml;chliche Teil des Experiments ist nun abgeschlossen. <b>Bitte bleiben Sie aber unbedingt noch bis zum Ende!</b><p>")
                .settings.css("font-size", "20px")
                ,        
                newText("comp1_2", "<p>Es folgt nun noch ein kurzer Verst&auml;ndnistest, um sicherzustellen, dass Sie w&auml;hrend des Experiments aufmerksam und konzentriert waren bzw. Ihre Antworten bewusst getroffen haben.<p>")
                .settings.css("font-size", "20px")
                ,
                newText("comp1_3", "<p>Ihnen wird gleich ein Feld mit mehreren Namen angezeigt. Neben jedem Namen befindet sich ein K&auml;stchen, das Sie ausw&auml;hlen k&ouml;nnen. Bitte markieren Sie diejenigen Namen, bei denen Sie glauben, dass Sie im Experiment vorkamen.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("compCanv", 900, 300)
                .settings.add(0,0, getText("comp1_1"))
                .settings.add(0,100, getText("comp1_2")  )
                .settings.add(0,200, getText("comp1_3")  )
                .print()   
                ,
                newButton("compStart", "Verst&auml;ndnistest beginnen")
                .settings.center()
                .print()
                .wait()
               )
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 8. Comprehension test proper

var names = [];
var test;
function handleNames(row){
   if (row.name=="void"){
     names = names.sort(v=>1-2*(Math.random()>=0.5));
     return newTrial("post-task",             newText("instructions", "<p>Bitte w&auml;hlen Sie diejenigen Namen aus,die w&auml;hrend des Experiments vorgekommen sind. <br> W&auml;hlen Sie hierf&uuml;r jeweils das linke K&auml;stchen f&uuml;r <b>Ja</b> bzw. das rechte K&auml;stchen f&uuml;r <b>Nein</b> aus.<p><p><b> Sie k&ouml;nnen das Experiment nur dann beenden, wenn Sie f&uuml;r alle Namen eine Auswahl getroffen haben.</b><p>")
             .settings.center()
             .settings.css("font-size", "20px")
             ,
             newCanvas("screen", 1500, 450)
             .add(350, 100, getText("instructions")) // leftmost ja/nein
             .add(285, 245, newText("Ja / Nein")) // leftmost ja/nein
             .add(650 , 245, newText("Ja / Nein")) // center ja/nein
             .add(990, 245, newText("Ja / Nein")) // rightmost ja/nein
             // names
             .add(250, 170 , newCanvas("names-1", "60%", "100%") ) // leftmost column
             .add( 620, 170, newCanvas("names-2", "60%", "100%") ) // center column
             .add( 960, 170 , newCanvas("names-3", "60%", "100%") ) // rightmost column
             .print( "font-size", "20px")
             ,
             ...names.map( (r,i) => {
               test = test || newFunction(v=>true).test.is(true);
               test = test.and( getScale(r.name+'-scale-'+r.match+', life ='+r.life+'list ='+r.which_list).test.selected() );
               return newText(r.name)
               .before(
               newScale(r.name+'-scale-'+r.match+', life ='+r.life+'list ='+r.which_list, "yes", "no") //global_z.css is needed to hide the lables "yes" & "no"
               .log()
               .print()
               )
               .print( "2em" , parseInt(6+(i%17)*2)+"em" , getCanvas("names-"+parseInt(1+i/17)) );
             })
               ,              
               newButton("continueb", "Experiment beenden")
               .print(640, 870)
               .wait(test)    //  would only proceed if all Scale elements are selected    
               )                           }
               names.push(row);
               return [];
             }
               Template( "post-task.csv", row => handleNames(row) );

//====================================================================================================================================================================================================================
// 9. Send results

PennController.SendResults( "send" )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 10. Good-bye

PennController( "final" ,
                newText("<p>Vielen Dank f&uuml;r Ihre Teilnahme an unserem Experiment!<p><br><b>Hier ist Ihr Validierungscode: CwDfgEx102</b><br><p>Bitte geben Sie diesen Code auf der Clickworker-Webseite ein, um Ihre Bezahlung zu erhalten.</p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newButton("void")
                .wait()
               )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true)