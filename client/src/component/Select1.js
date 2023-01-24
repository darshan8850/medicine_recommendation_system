// import { display } from "@mui/system";
import React, { useState,useEffect} from "react";
import { conditions } from "../conditions";
import DrugName from "./DrugName";

export default function Select1() {
  const [drug, setdrug] = useState("");
  const [RecommendMedi, setRecommendMedi] = useState("");
  //  when input change drug change ,after selecting one condition drug 
  // should not change {for displaying Section }so i use shown drug which only changes on submit
  const [shownDrug, setshownDrug] = useState("")   
  let count=0; //just to set key
 
  // ****submit when user Enter a Name of condition
  const submit=(drug)=>{ 
    setdrug(drug); //seting drug
     setshownDrug(drug);    //setting shown drug
    // const a="https://prognodserver.hop.sh/predict/";  // api**?
    //  console.log(a+drug);
    const a="http://localhost:5000/predict/"  // local server not for deployment;
    fetch(a+drug)
    .then((res)=> res.json())
    .then((data)=>  display(data.drugs.drugName) );
    
  }
  // *****-Storeing the result, getting through API in RecommendMedi
  const display=(name)=>{
    setRecommendMedi(Object.values(name));
    // console.log("aman")
    // console.log(RecommendMedi.map((ele)=>{return ele}));

  }

  //////dom-----------------------
  // for recommendation section class change {visible};
  const [rec_vis, setrec_vis] = useState("searchRecommend");
  const [inp, setinp] = useState("inp-none");
  

  //useeffect so setrec can run properly -- on every input change it runs
  useEffect(() => {
    if(drug){
      setrec_vis("searchRecommend-vis");
      setinp("inp-vis");
    }
    else{
      setrec_vis("searchRecommend");
      setinp("inp-none");
  
    }
    console.log(drug);
  }, [drug]);

  



  return (
    <>
    <div className="my-app">
      Your one stop for getting better Drug recommendation
    </div>
      <div className="search">
        
        <label htmlFor="DrugName"> Enter your Condition:</label>
        <input className={inp} type="text" value={drug}  onChange={(e)=>{
          setdrug(e.target.value);
          
          }} placeholder="ex : Depression" />
        
          
          {/* ***displaying the result with same name below search-bar */}
        {/* passing dynamic class rec_vis to change visibility */}
        <div className={rec_vis} >
          {conditions
            .filter((ele) => {
              return ele.toLowerCase().startsWith(drug.toLowerCase());
            })
            .map((ele) => {        //onClick={()=>{setdrug(ele)}
              return <div className="names" key={`name${count++}`}  onClick={()=>{submit(ele)}}>{ele} </div>;
            })}
        </div>

      </div>
{/* **********displaying recommended drugs**--- */}
      <div className="Mediciens">
        {
          RecommendMedi===""? (<> <h3 style={{"textAlign":"center"}}>Your selected condition: None</h3></>):
          (<><div className="information">

              <h2>Your selected condition: {shownDrug} </h2>

              <p>Here are some Drugs that may be useful based on user reviews and ranked.</p>
            </div><div className="drugs">

                {RecommendMedi.map((ele) => { return <DrugName key={ele} Name={ele}></DrugName>; })}
              </div></>
               
            )

        }
      </div>
    </>
  );
}
