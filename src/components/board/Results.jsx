import { useContext } from "react";
import { BoardContext } from "./Board";

function Results () {
    const {finalValues} = useContext(BoardContext);
    const calcWPM = () => {
        const totalTime = finalValues.lastTime === 0 ? finalValues.initialTime : finalValues.initialTime - finalValues.lastTime;
        if(finalValues.writedWords === 0){
            return 0;
        }
        return 60 * totalTime / finalValues.totalWords;
    }
    return <div className="container flex flex-col mx-auto">
            <div className="w-full">
                <div className="container flex flex-col items-center sm:gap-16 mx-auto">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-y-3 items-center p-3 bg-configuration-back rounded-xl text-configuration-buttons/[0.7] shadow-lg">
                            <h3 className="text-5xl text-center text-green-600">{finalValues.writedWords}</h3>
                            <p>Total Words</p>
                        </div>
                        <div className="flex flex-col gap-y-3 items-center p-3 bg-configuration-back rounded-xl text-configuration-buttons/[0.7] shadow-lg">
                            <h3 className="text-5xl text-center text-red-500">{finalValues.keysErrors}</h3>
                            <p>Mistakes</p>
                        </div>
                       <div className="flex flex-col gap-y-3 items-center p-3 bg-configuration-back rounded-xl text-configuration-buttons/[0.7] shadow-lg">
                            <h3 className="text-5xl text-center">{calcWPM()}</h3>
                            <p>WPM</p>
                        </div>
                        <div className="flex flex-col gap-y-3 items-center p-3 bg-configuration-back rounded-xl text-configuration-buttons/[0.7] shadow-lg">
                        <h3 className="text-5xl text-center">{(finalValues.writedWords * 100 / finalValues.totalWords).toFixed(0)}%</h3>
                        <p>Accuracy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
}

export default Results;