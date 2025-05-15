import EditChapter from "../components/edithChapter.jsx";
import Naruto from "../../public/assets/Naruto2.jpg"
export default function ChapterEdit() {
    return (
        <section className="flex min-h-screen">
         
            <div className="w-1/2 flex items-center justify-center p-8">
                <EditChapter/>
            </div>
            
            <div className="w-1/2 flex items-center justify-center">
                <img 
                    src={Naruto} 
                    alt="Descripción de la imagen"
                    className="max-w-full max-h-full object-cover"
                />
            </div>
        </section>
    );
}