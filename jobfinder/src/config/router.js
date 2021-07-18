import Jobform from "../components/JobForm/jobform";


export const routes = [
    
    {path: '/jobform', component: Jobform},
    {path:'/', exact:true, redirectTo:'/jobform'},
    
]
