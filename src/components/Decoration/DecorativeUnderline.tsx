import { Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DecorativeUnderlineProps {
    className?: string;
    flowerColor?: string;
    lineColor?: string;
}

const DecorativeUnderline: React.FC<DecorativeUnderlineProps> = ({
    className,
    flowerColor,
    lineColor,
}) => {
    return (
        <div
            className={cn(
                "flex justify-center items-center mt-7 md:mt-8 space-x-3 sm:space-x-4",
                className,
            )}
            style={{ animationDelay: "0.9s" }}
        >
            <div
                className={cn(
                    "w-8 sm:w-10 md:w-12 h-0.5 bg-wedding-cream/50",
                    lineColor,
                )}
            ></div>
            <Flower2
                className={cn("text-wedding-cream/70", flowerColor)}
                size={window.innerWidth < 640 ? 16 : 20}
            />
            <div
                className={cn(
                    "w-8 sm:w-10 md:w-12 h-0.5 bg-wedding-cream/50",
                    lineColor,
                )}
            ></div>
        </div>
    );
};

export default DecorativeUnderline;
