// import { Box, Heading, Text, Link, VStack, Divider, useColorModeValue, Spinner, Center } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import QuestionsAPI from '../../api/questions/questions';
// import { type QuestionData } from '../../types/questions/questions';
// import 'allotment/dist/style.css';
// import QuestionEditIconButton from '../../components/itinerarys/ItineraryEditIconButton';

// const ViewQuestion: React.FC = () => {
//   const { questionId } = useParams(); // Get questionId from URL parameters
//   const [question, setQuestion] = useState<QuestionData | null>(null);
//   const colourScheme = useColorModeValue('gray.600', 'gray.400');
//   const editorTheme = useColorModeValue('light', 'vs-dark');

//   useEffect(() => {
//     const fetchQuestion = async (): Promise<void> => {
//       try {
//         if (questionId !== null && questionId !== undefined) {
//           const response = await new QuestionsAPI().getQuestionById(parseInt(questionId, 10));
//           setQuestion(response);
//         }
//       } catch (error) {
//         console.error('Error fetching question:', error);
//       }
//     };

//     if (questionId !== null && questionId !== undefined) {
//       fetchQuestion().catch((error) => {
//         console.error('Error handling fetchQuestion promise:', error);
//       });
//     }
//   }, [questionId]);

//   if (question === null || question === undefined) {
//     return (
//       <Center h="100vh">
//         <Spinner size="xl" />
//       </Center>
//     );
//   }

//   if (questionId === null || questionId === undefined) {
//     return <div>No question ID provided.</div>;
//   }

//   return (
//     <Box width="100%" height="85vh" my={5}>
//           <VStack as="div" style={{ overflowY: 'auto', height: '100%', padding: '16px' }}>
//             <Heading as="h1" size="xl" textAlign="center">
//               {question.title}
//               <QuestionEditIconButton questionId={question.questionID} title={question.title} />
//             </Heading>
//             <Text fontSize="md" color={colourScheme} mt={2}>
//               <span style={{ fontWeight: 'bold' }}>Link to Question: </span>
//               <Link href={question.linkToQuestion}>{question.linkToQuestion}</Link>
//             </Text>
//             <Divider mt={4} />
//             <VStack align="start" spacing={4} mt={4}>
//               <Heading as="h2" size="md">
//                 Description
//               </Heading>
//               <Text whiteSpace="pre-line">{question.questionDescription}</Text>
//             </VStack>
//           </VStack>
//     </Box>
//   );
// };

// export default ViewQuestion;
