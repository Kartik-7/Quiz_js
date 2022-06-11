

const quizData = [  
    {  
     question: "Which language runs in a web browser?",  
     a: "Java",  
     b: "C",  
     c: "Python",  
     d: "JavaScript",  
     correct: "d",  
    },  
    {  
     question: "What does CSS stand for?",  
     a: "Central Style Sheets",  
     b: "Cascading Style Sheets",  
     c: "Cascading Simple Sheets",  
     d: "Cars SUVs Sailboats",  
     correct: "b",  
    },  
    {  
     question: "What does HTML stand for?",  
     a: "Hypertext Markup Language",  
     b: "Hypertext Markdown Language",  
     c: "Hyperloop Machine Language",  
     d: "Helicopters Terminals Motorboats Lamborginis",  
     correct: "a",  
    },  
    {  
     question: "What year was JavaScript launched?",  
     a: "1996",  
     b: "1995",  
     c: "1994",  
     d: "nonee of the above",  
     correct: "b",  
    },
    {  
    question: `End of quiz. 
               Double click Final Submit to Submit
               And check out answers and results below!`,  
    a: "end",  
    b: "end",  
    c: "end",  
    d: "end",  
    correct: "a",  
    },
   ];

    const numOfQues = quizData.length - 1
    var answerarr = Array(numOfQues+2).fill("none")
    var quesNum=0
    var score = 0
    var listResult = ""
    var attempted_ques = ""
    const ques= document.getElementById("ques-txt")
    const ansA= document.getElementById("a")
    const ansB= document.getElementById("b")
    const ansC= document.getElementById("c")
    const ansD= document.getElementById("d")
    const savedA = document.getElementById("savedAns")
    const result_id = document.getElementById("result")
    const save_btn = document.getElementById("save_btn")
    const next =document.getElementById("next")
    const previous =document.getElementById("previous")
    const start_btn = document.getElementById("start")
    const clear_btn = document.getElementById("clear-saved")
    
    function clearRadio(){
        var ele = document.getElementsByName("answer");
        for(var i=0;i<ele.length;i++)
        ele[i].checked = false;
    }

    function callSaved(quesinp){
        savedA.innerText = ` Saved Answer: ${answerarr[quesinp]}`
        if (savedA.innerText === "Saved Answer: none"){
            savedA.style.color = "#ff0019"
        }
        else savedA.style.color = "#48ff00"

        if (quesNum===5){ques.style.color = " #ff9900"}
            else ques.style.color = "#001a00"
    }


   function proceed(num){
        if(quesNum<=(numOfQues)){
            
            ques.innerText =  quizData[num].question
            ansA.innerText = "A) " +quizData[num].a
            ansB.innerText = "B) " +quizData[num].b
            ansC.innerText = "C) " +quizData[num].c
            ansD.innerText = "D) " +quizData[num].d
            quesNum++
            callSaved(quesNum)
            
            
            }
        clearRadio()
        }
    

    function receed(num){
        if(quesNum<=numOfQues+1){
            
            ques.innerText = quizData[num].question
            ansA.innerText = "A) " +quizData[num].a
            ansB.innerText = "B) " +quizData[num].b
            ansC.innerText = "C) " +quizData[num].c
            ansD.innerText = "D) " +quizData[num].d
            quesNum--
            callSaved(quesNum)
            }
        clearRadio()
        }
    

    function answerPush(quesNum) {
            answerarr.splice(quesNum, 1,document.querySelector('input[name="answer"]:checked').value )  
            }

    function clearSaved(quesNum){
        answerarr.splice(quesNum, 1, "none")
        callSaved(quesNum)
        clearRadio()
    }

    function updateAttempted(){
        attempted_ques = ""
        for(var i=0;i<(numOfQues);i++){
            if (answerarr[i+1]==="none"){
                attempted_ques += `
                <li style="color: red">
                    NOT ATTEMPTED
                </li></br>`
            }
            else {
                attempted_ques += `
                <li style="color: #48ff00">
                    ATTEMPTED
                </li></br>`
            }
        }
    }

    function checkAns(ind){
        var opt_correct = [quizData[ind].correct]
        if (quizData[ind].correct===answerarr[ind+1]){
            score++
            listResult += `
            <li style="color: #48ff00">
                Your answer - ${answerarr[ind+1]} - ${quizData[ind][answerarr[ind+1]]} is correct! //+1
            </li></br>`
        }
        else if (answerarr[ind+1]==="none"){
                listResult += `
                    <li >
                        You didn't attempt the question. //0</br></br>
                        Correct answer - ${opt_correct} - ${quizData[ind][opt_correct]}
                    </li></br>`
        }
        else {
            listResult += `
            <li style="color: red">
            Your answer - ${answerarr[ind+1]} - ${quizData[ind][answerarr[ind+1]]} is incorrect! //-0.25</br></br>
            Correct answer - ${opt_correct} -  ${quizData[ind][opt_correct]}
            </li></br>`
            score -=0.25
            }
    }

    function finalsubmit(){
            for(var i=0;i<(numOfQues);i++){
                checkAns(i)   
            }
            document.getElementById("score").innerHTML = `Score- ${score} out of ${numOfQues}`
            result_id.innerHTML = listResult
            document.getElementById("finalSubmit").disabled = true
            proceed(numOfQues)
            save_btn.disabled = true
            clear_btn.disabled = true
       }


    start_btn.addEventListener("click", 
        function (){proceed(0)
            start_btn.disabled = true
            next.disabled = false
            previous.disabled = false
            save_btn.disabled = false
            clear_btn.disabled = false
            document.getElementById("finalSubmit").disabled = false
            updateAttempted()
            document.getElementById("attempted").innerHTML = attempted_ques
        })


    previous.addEventListener("click", function ()
    {receed(quesNum-2)})


    next.addEventListener("click", function ()
                                    {proceed(quesNum)})

    
    save_btn.addEventListener("click", function (){
        if (quesNum<=numOfQues){ 
            var selAns = document.querySelector("[name=answer]:checked");
            if (selAns){
                answerPush(quesNum)
                proceed(quesNum)
                callSaved(quesNum)
            }
            else {alert("No option selected!")}

            updateAttempted()
            document.getElementById("attempted").innerHTML = attempted_ques
        }
    })


    clear_btn.addEventListener("click",function(){
        clearSaved(quesNum)
        updateAttempted()
        document.getElementById("attempted").innerHTML = attempted_ques
        
    })


    document.getElementById("finalSubmit").disabled = true
    next.disabled = true
    previous.disabled = true
    save_btn.disabled = true
    clear_btn.disabled = true
    clearRadio()
        
    
       
    
        

    
    
    
    
    
    
    

    
   
   