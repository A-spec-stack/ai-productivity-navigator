import { useState } from "react"
import "./App.css"

const journey = {

Awareness:{
cluster:"Content Production & Campaign Creation",
impact:"Very High",

tasks:[
"Blog Articles",
"LinkedIn Posts",
"Whitepapers",
"Ads",
"Landing Pages"
],

useCases:[
"Content Draft Generation",
"Campaign Variant Creation",
"Ad Creative Generation",
"SEO Content Scaling"
],

workflow:{
"Content Draft Generation":["Topic","Research","Draft Agent","Brand Check","Publish"],
"Campaign Variant Creation":["Campaign Brief","Variant Generator","Quality Check","Ad Setup"],
"Ad Creative Generation":["Campaign Goal","Creative Generator","A/B Variant","Launch"],
"SEO Content Scaling":["Keyword Input","SERP Analysis","Content Draft","SEO Optimization"]
},

gains:[
"Content Production: 3–5× faster",
"Campaign Setup: 5–10× faster",
"Ad Variants: 10× more variations"
]

},

Consideration:{
cluster:"Lead Research & Qualification",
impact:"Very High",

tasks:[
"Account Research",
"Stakeholder Research",
"Industry Analysis",
"Lead Qualification"
],

useCases:[
"Automatic Account Briefings",
"Intent Signal Analysis",
"Lead Prioritization",
"Stakeholder Mapping"
],

workflow:{
"Automatic Account Briefings":["Company Input","Data Enrichment","AI Summary","Sales Brief"],
"Intent Signal Analysis":["Signal Capture","Intent Model","Score","Sales Alert"],
"Lead Prioritization":["Lead Data","Scoring Model","Priority Queue"],
"Stakeholder Mapping":["Account Input","Org Graph Builder","Influence Mapping"]
},

gains:[
"Account Research: 2h → 10min",
"Lead Qualification: automated",
"Time savings: 70–90%"
]

},

Purchase:{
cluster:"Sales Administration & Deal Support",
impact:"Very High",

tasks:[
"Meeting Preparation",
"Follow-up Emails",
"CRM Updates",
"Proposal Drafts"
],

useCases:[
"Meeting Summary Agents",
"Follow-up Email Generation",
"Proposal Draft Generation",
"Deal Analysis"
],

workflow:{
"Meeting Summary Agents":["Transcript","Summary Agent","Action Extract","CRM Update"],
"Follow-up Email Generation":["Meeting Notes","Draft Agent","Tone Adjust","Send"],
"Proposal Draft Generation":["Opportunity Data","Proposal Generator","Pricing Check","Send"],
"Deal Analysis":["Pipeline Data","Risk Model","Deal Insights"]
},

gains:[
"Follow-ups: −80%",
"Proposal Draft: −60–80%",
"Meeting Notes: automated"
]

},

Loyalty:{
cluster:"Customer Support Automation",
impact:"Very High",

tasks:[
"Support Tickets",
"FAQs",
"Onboarding Support",
"Knowledge Retrieval"
],

useCases:[
"Support Bots",
"Knowledge Assistants",
"Ticket Classification"
],

workflow:{
"Support Bots":["Customer Question","Intent Detection","Knowledge Search","Answer"],
"Knowledge Assistants":["Query","Vector Search","Answer Generation"],
"Ticket Classification":["Ticket","Classifier","Routing"]
},

gains:[
"Ticket Handling: −30–50%",
"First Response: −80%",
"Support Cost: −20–40%"
]

}

}

export default function App(){

const [stage,setStage] = useState("Awareness")
const [confidence,setConfidence] = useState(85)
const [selectedUseCase,setSelectedUseCase] = useState(null)

const data = journey[stage]

let workflow = selectedUseCase ? [...data.workflow[selectedUseCase]] : null

// ⭐ HUMAN IN THE LOOP LOGIK
if(workflow && confidence < 50){
workflow.splice(2,0,"Human Review")
}

return(

<div className="container">

<h1>AI Productivity Navigator</h1>

<p className="intro">
Explore where generative AI delivers the strongest productivity gains
across marketing, sales and customer success along the B2B buyer journey.
</p>

<div className="journey-nav">

{Object.keys(journey).map((phase)=>(

<button
key={phase}
className={stage === phase ? "active" : ""}
onClick={()=>{
setStage(phase)
setSelectedUseCase(null)
}}
>

{phase}

</button>

))}

</div>

<div className="card">

<h2>{stage}</h2>

<p>
Productivity Cluster: <b>{data.cluster}</b>
</p>

<p>
Impact Level: <span className="impact">{data.impact}</span>
</p>

<h3>Typical Tasks</h3>

<ul>
{data.tasks.map(t=><li key={t}>{t}</li>)}
</ul>

<h3>AI Use Cases</h3>

<div className="usecase-grid">

{data.useCases.map(u=>(

<button
key={u}
className={`usecase-card ${selectedUseCase === u ? "active" : ""}`}
onClick={()=>setSelectedUseCase(u)}
>

{u}

</button>

))}

</div>

<h3>Productivity Gains</h3>

<ul>
{data.gains.map(g=><li key={g}>{g}</li>)}
</ul>

<h3>Selected: {selectedUseCase}</h3>

{selectedUseCase && (

<>

<h3>{selectedUseCase} — Agent Workflow</h3>

<div className="agent-workflow">

{workflow.map((step,index)=>{

const isHuman = step === "Human Review"

return(

<div
key={index}
className={`node ${isHuman ? "human-node" : ""}`}
>

{step}

</div>

)

})}

</div>

</>

)}

<h3>Agent Confidence</h3>

<div className="agent-confidence">

<input
type="range"
min="0"
max="100"
value={confidence}
onChange={(e)=>setConfidence(e.target.value)}
/>

<div className="confidence-value">

{confidence}% confidence

</div>

{confidence < 50 && (

<div className="confidence-warning">

Human review inserted into workflow

</div>

)}

</div>

</div>

</div>

)

}