import { createContext, useContext, useState } from 'react';
import { SystemStyleObject } from '@chakra-ui/react';

interface TutorialContextProps {
    tutorialList: Tutorial[];
    updateTutorialList: (newTutorialList: Tutorial[]) => void;
}

export interface Tutorial {
    position: SystemStyleObject;
    text: string;
}

const TutorialContext = createContext<TutorialContextProps | null>(null);

export const TutorialProvider = ({ children }: any) => {
    const [tutorialList, setTutorialList] = useState<Tutorial[]>([
        {
            position: { pos: "fixed", bottom: "20", right: "4" },
            text: "TEST TUTORIAL TEXT"
        },
    ]);

    const updateTutorialList = (newTutorialList: Tutorial[]) => {
        setTutorialList(newTutorialList);
    };

    return (
        <TutorialContext.Provider value={{ tutorialList, updateTutorialList }}>
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