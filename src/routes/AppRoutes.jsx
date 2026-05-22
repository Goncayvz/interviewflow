import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import QuestionBank from "../pages/QuestionBank";
import QuizMode from "../pages/QuizMode";
import MockInterview from "../pages/MockInterview";
import Progress from "../pages/Progress";

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="question" element={<QuestionBank/>}/>
                <Route path="quiz" element={<QuizMode/>}/>
                <Route path="mock-interview" element={<MockInterview/>}/>
                <Route path="progress" element={<Progress/>}/>
            </Route>
        </Routes>
    )
}
export default AppRoutes;
