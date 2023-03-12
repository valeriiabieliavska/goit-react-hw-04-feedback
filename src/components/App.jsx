import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export const App = () => {
const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

const onLeaveFeedback = option => {
setFeedback(prevFeedback => ({
...prevFeedback,
[option]: prevFeedback[option] + 1,
}));
};

const countTotalFeedback = () => {
const { good, neutral, bad } = feedback;
return good + neutral + bad;
};

const countPositiveFeedbackPercentage = () => {
const total = (feedback.good * 100) / countTotalFeedback();
return Math.round(total);
};

const totalFeedback = countTotalFeedback();
return (
<>
<Section title="Please leave feedback">
<FeedbackOptions
       options={Object.keys(feedback)}
       onLeaveFeedback={onLeaveFeedback}
     ></FeedbackOptions>
</Section>
<Section title="Statistics">
{totalFeedback > 0 ? (
<Statistics
         good={feedback.good}
         neutral={feedback.neutral}
         bad={feedback.bad}
         total={totalFeedback}
         positivePercentage={countPositiveFeedbackPercentage()}
       ></Statistics>
) : (
<Notification message="There is no feedback" />
)}
</Section>
</>
);
};



