import {
  Center,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ICardProps {
  children: ReactNode
}

export default function Card({ children }: ICardProps) {
  const stackBg = useColorModeValue('white', 'gray.900')
  const gray1 = useColorModeValue('gray.50', 'gray.800')
  const gray2 = useColorModeValue('gray.700', 'gray.400')

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%' }}
        h={'100%'}
        direction={{ base: 'column', md: 'row' }}
        bg={stackBg}
        boxShadow={'2xl'}
        padding={4}>
        {children}
      </Stack>
    </Center>
  );
}