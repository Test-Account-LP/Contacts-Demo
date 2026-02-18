import { useState } from 'react';
import { X, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export interface QuestQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    timeEstimate: string;
    points: number;
    questions: QuestQuestion[];
    successMessage: string;
}

interface QuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    quest: Quest;
    onComplete: (points: number) => void;
}

export default function QuestModal({ isOpen, onClose, quest, onComplete }: QuestModalProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!isOpen) return null;

    const currentQuestion = quest.questions[currentQuestionIndex];
    const totalQuestions = quest.questions.length;

    // Progress calculation (0 to 100)
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        const correct = index === currentQuestion.correctAnswerIndex;
        setIsCorrect(correct);
    };

    const handleNext = () => {
        if (!isCorrect) {
            // Reset for retry
            setSelectedOption(null);
            setIsAnswered(false);
            return;
        }

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsCorrect(false);
        } else {
            // Quest Completed
            setShowSuccess(true);
        }
    };

    const handleFinish = () => {
        onComplete(quest.points);
        onClose();
        // Reset state after close
        setTimeout(() => {
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setShowSuccess(false);
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                    >
                        <X size={20} />
                    </button>
                    {!showSuccess && (
                        <>
                            <div className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">Learning Quest</div>
                            <h2 className="text-2xl font-bold max-w-[80%]">{quest.title}</h2>
                        </>
                    )}
                </div>

                {/* Progress Bar */}
                {!showSuccess && (
                    <div className="h-1 bg-slate-100">
                        <div
                            className="h-full bg-teal-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                <div className="p-6">
                    {showSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Quest Completed!</h3>
                            <p className="text-slate-500 mb-8">{quest.successMessage}</p>

                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-8">
                                <div className="text-xs text-amber-600 font-bold uppercase mb-1">Reward Earned</div>
                                <div className="text-3xl font-bold text-amber-500">+{quest.points} PTS</div>
                            </div>

                            <button
                                onClick={handleFinish}
                                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                Collect Rewards
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <div className="text-xs font-bold text-slate-400 mb-2">Question {currentQuestionIndex + 1} of {totalQuestions}</div>
                                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                                    {currentQuestion.question}
                                </h3>
                            </div>

                            <div className="space-y-3 mb-8">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = selectedOption === idx;
                                    const showCorrect = isAnswered && idx === currentQuestion.correctAnswerIndex;
                                    const showWrong = isAnswered && isSelected && !isCorrect;

                                    let baseClass = "w-full p-4 rounded-xl text-left font-medium border-2 transition-all flex justify-between items-center ";
                                    if (isAnswered) {
                                        if (showCorrect) baseClass += "border-teal-500 bg-teal-50 text-teal-700";
                                        else if (showWrong) baseClass += "border-rose-500 bg-rose-50 text-rose-700";
                                        else baseClass += "border-slate-100 text-slate-400 opacity-50";
                                    } else {
                                        baseClass += "border-slate-100 hover:border-teal-200 hover:bg-slate-50 text-slate-700";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={isAnswered}
                                            className={baseClass}
                                        >
                                            {option}
                                            {showCorrect && <CheckCircle size={20} className="text-teal-500" />}
                                            {showWrong && <AlertCircle size={20} className="text-rose-500" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Feedback / Next Action */}
                            <div className={`transition-all duration-300 ${isAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                {isCorrect ? (
                                    <button
                                        onClick={handleNext}
                                        className="w-full py-3.5 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                                    >
                                        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Quest'} <ArrowRight size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { setIsAnswered(false); setSelectedOption(null); }}
                                        className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
