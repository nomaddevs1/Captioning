import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SystemStyleObject } from '@chakra-ui/react';

interface TutorialContextProps {
    toggleHelp: React.RefObject<HTMLButtonElement>;
    tutorialList: Tutorial;
    updateTutorialList: (newTutorialList: Tutorial) => void;
}

interface TutorialListProps {
    position: SystemStyleObject;
    text: string;
}

export interface Tutorial {
    id: string;
    tutorials: TutorialListProps[];
}

const TutorialContext = createContext<TutorialContextProps | null>(null);

export const TutorialProvider = ({ children }: any) => {
    const [tutorialList, setTutorialList] = useState<Tutorial>({
        id: "tutorialID",
        tutorials: [{
            position: { pos: "fixed", bottom: "20", right: "4" },
            text: "TEST TUTORIAL TEXT"
        },
    ]});

    const toggleHelp = useRef(null);

    const updateTutorialList = (newTutorialList: Tutorial) => {
        setTutorialList(newTutorialList);
    };

    useEffect(() => {
        const visited = localStorage.getItem(`visited_${tutorialList.id}`);
        if(!visited && toggleHelp.current){
            localStorage.setItem(`visited_${tutorialList.id}`, 'true');
            //@ts-ignore
            toggleHelp.current.click();
        }
    }, [tutorialList.id]);

    return (
        <TutorialContext.Provider value={{ toggleHelp, tutorialList, updateTutorialList }}>
            {children}
        </TutorialContext.Provider>
    );
};

export const useTutorialContext = () => {
    const context = useContext(TutorialContext);
    if (!context) {
        throw new Error(
            'useTutorial must be used within a TutorialProvider'
        );
    }
    return context;
};