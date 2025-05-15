import EditChapter from "../components/edithChapter.jsx";
import Naruto from "../../public/assets/Naruto2.jpg";

export default function ChapterEdit() {
    return (
        <section className="flex min-h-screen flex-col md:flex-row">
            
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <EditChapter/>
            </div>
            
           
            <div className="hidden md:flex md:w-1/2 items-center justify-center">
                <img 
                    src={Naruto} 
                    alt="Naruto"
                    className="max-w-full max-h-full object-cover"
                />
            </div>
        </section>
    );
}