import { motion } from 'framer-motion';
import { useView } from '../../context/ViewContext';


interface SmartDonationButtonProps {
    /** If provided, overrides the default click behaviour (setView → donation).
     *  Use this to wire a direct MP link when the button lives inside the donation view. */
    onDonate?: () => void;
    enableTooltip?: boolean; // kept for API compatibility, no longer used
    className?: string;
    id?: string;
}

export default function SmartDonationButton({ onDonate, className = '', id }: SmartDonationButtonProps) {
    const { setView } = useView();

    // Default: navigate to donation view (home context).
    // Override: any callable passed by the parent (e.g. window.open for the donation page).
    const handleClick = () => {
        if (onDonate) {
            onDonate();
        } else {
            setView('donation');
        }
    };

    return (
        <div id={id} className={`relative group ${className}`}>
            <motion.button
                className="group flex items-center justify-center gap-3 px-8 py-3 border-2 rounded-full font-bold uppercase tracking-widest text-sm md:text-base transition-all duration-300 cursor-pointer overflow-hidden transform origin-center animate-[pulse-yellow_3s_infinite] border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-navy hover:shadow-[0_0_20px_rgba(255,189,89,0.4)] hover:animate-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
            >
                FAÇA SUA DOAÇÃO
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <motion.span
                        className="absolute text-xl"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: [1, 0, 0, 1], scale: [1, 0.5, 0.5, 1] }}
                        transition={{ duration: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
                    >
                        💛
                    </motion.span>
                    <motion.span
                        className="absolute text-xl"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
                        transition={{ duration: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
                    >
                        ❤️
                    </motion.span>
                </div>
            </motion.button>
        </div>
    );
}
