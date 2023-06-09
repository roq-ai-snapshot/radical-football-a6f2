import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import {
  Text,
  Box,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Link,
  IconButton,
  Flex,
  Center,
  Stack,
} from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import { getPlayerById } from 'apiSdk/players';
import { Error } from 'components/error';
import { PlayerInterface } from 'interfaces/player';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { deleteDrillById } from 'apiSdk/drills';
import { deletePerformanceMetricById } from 'apiSdk/performance-metrics';
import { deleteTrainingSessionById } from 'apiSdk/training-sessions';

function PlayerViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerInterface>(
    () => (id ? `/players/${id}` : null),
    () =>
      getPlayerById(id, {
        relations: [
          'user_player_user_idTouser',
          'academy',
          'user_player_coach_idTouser',
          'drill',
          'performance_metric',
          'training_session',
        ],
      }),
  );

  const drillHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteDrillById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const performance_metricHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deletePerformanceMetricById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const training_sessionHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteTrainingSessionById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Flex justifyContent="space-between" mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Player Detail View
          </Text>
          {hasAccess('player', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
            <NextLink href={`/players/edit/${data?.id}`} passHref legacyBehavior>
              <Button
                onClick={(e) => e.stopPropagation()}
                mr={2}
                as="a"
                variant="outline"
                colorScheme="blue"
                leftIcon={<FiEdit2 />}
              >
                Edit
              </Button>
            </NextLink>
          )}
        </Flex>
        {error && (
          <Box mb={4}>
            {' '}
            <Error error={error} />{' '}
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <Stack direction="column" spacing={2} mb={4}>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Created At:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.created_at as unknown as string}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Updated At:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.updated_at as unknown as string}
                </Text>
              </Flex>
            </Stack>
            <Box>
              {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" as="span">
                    User Player User Id Touser:
                  </Text>
                  <Text fontSize="md" as="span" ml={3}>
                    <Link as={NextLink} href={`/users/view/${data?.user_player_user_idTouser?.id}`}>
                      {data?.user_player_user_idTouser?.email}
                    </Link>
                  </Text>
                </Flex>
              )}
              {hasAccess('academy', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" as="span">
                    Academy:
                  </Text>
                  <Text fontSize="md" as="span" ml={3}>
                    <Link as={NextLink} href={`/academies/view/${data?.academy?.id}`}>
                      {data?.academy?.name}
                    </Link>
                  </Text>
                </Flex>
              )}
              {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" as="span">
                    User Player Coach Id Touser:
                  </Text>
                  <Text fontSize="md" as="span" ml={3}>
                    <Link as={NextLink} href={`/users/view/${data?.user_player_coach_idTouser?.id}`}>
                      {data?.user_player_coach_idTouser?.email}
                    </Link>
                  </Text>
                </Flex>
              )}
              {hasAccess('drill', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Stack spacing={2} mb={8}>
                  <Flex justifyContent="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Drills
                    </Text>
                    <NextLink passHref href={`/drills/create?player_id=${data?.id}`}>
                      <Button colorScheme="blue" mr="4" as="a">
                        Create
                      </Button>
                    </NextLink>
                  </Flex>
                  <TableContainer mb={4}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>name</Th>
                          <Th>description</Th>
                          <Th>duration</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.drill?.map((record) => (
                          <Tr cursor="pointer" onClick={() => router.push(`/drills/view/${record.id}`)} key={record.id}>
                            <Td>{record.name}</Td>
                            <Td>{record.description}</Td>
                            <Td>{record.duration}</Td>
                            <Td>
                              {hasAccess('drill', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                                <NextLink passHref href={`/drills/edit/${record.id}`}>
                                  <Button mr={2} as="a" variant="outline" colorScheme="blue" leftIcon={<FiEdit2 />}>
                                    Edit
                                  </Button>
                                </NextLink>
                              )}
                              {hasAccess('drill', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                                <IconButton
                                  onClick={() => drillHandleDelete(record.id)}
                                  colorScheme="red"
                                  variant="outline"
                                  aria-label="edit"
                                  icon={<FiTrash />}
                                />
                              )}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Stack>
              )}

              {hasAccess('performance_metric', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Stack spacing={2} mb={8}>
                  <Flex justifyContent="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Performance Metrics
                    </Text>
                    <NextLink passHref href={`/performance-metrics/create?player_id=${data?.id}`}>
                      <Button colorScheme="blue" mr="4" as="a">
                        Create
                      </Button>
                    </NextLink>
                  </Flex>
                  <TableContainer mb={4}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>name</Th>
                          <Th>value</Th>
                          <Th>unit</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.performance_metric?.map((record) => (
                          <Tr
                            cursor="pointer"
                            onClick={() => router.push(`/performance-metrics/view/${record.id}`)}
                            key={record.id}
                          >
                            <Td>{record.name}</Td>
                            <Td>{record.value}</Td>
                            <Td>{record.unit}</Td>
                            <Td>
                              {hasAccess(
                                'performance_metric',
                                AccessOperationEnum.UPDATE,
                                AccessServiceEnum.PROJECT,
                              ) && (
                                <NextLink passHref href={`/performance-metrics/edit/${record.id}`}>
                                  <Button mr={2} as="a" variant="outline" colorScheme="blue" leftIcon={<FiEdit2 />}>
                                    Edit
                                  </Button>
                                </NextLink>
                              )}
                              {hasAccess(
                                'performance_metric',
                                AccessOperationEnum.DELETE,
                                AccessServiceEnum.PROJECT,
                              ) && (
                                <IconButton
                                  onClick={() => performance_metricHandleDelete(record.id)}
                                  colorScheme="red"
                                  variant="outline"
                                  aria-label="edit"
                                  icon={<FiTrash />}
                                />
                              )}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Stack>
              )}

              {hasAccess('training_session', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Stack spacing={2} mb={8}>
                  <Flex justifyContent="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Training Sessions
                    </Text>
                    <NextLink passHref href={`/training-sessions/create?player_id=${data?.id}`}>
                      <Button colorScheme="blue" mr="4" as="a">
                        Create
                      </Button>
                    </NextLink>
                  </Flex>
                  <TableContainer mb={4}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>date</Th>
                          <Th>duration</Th>
                          <Th>location</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.training_session?.map((record) => (
                          <Tr
                            cursor="pointer"
                            onClick={() => router.push(`/training-sessions/view/${record.id}`)}
                            key={record.id}
                          >
                            <Td>{record.date as unknown as string}</Td>
                            <Td>{record.duration}</Td>
                            <Td>{record.location}</Td>
                            <Td>
                              {hasAccess('training_session', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                                <NextLink passHref href={`/training-sessions/edit/${record.id}`}>
                                  <Button mr={2} as="a" variant="outline" colorScheme="blue" leftIcon={<FiEdit2 />}>
                                    Edit
                                  </Button>
                                </NextLink>
                              )}
                              {hasAccess('training_session', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                                <IconButton
                                  onClick={() => training_sessionHandleDelete(record.id)}
                                  colorScheme="red"
                                  variant="outline"
                                  aria-label="edit"
                                  icon={<FiTrash />}
                                />
                              )}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Stack>
              )}
            </Box>
            <Box></Box>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player',
  operation: AccessOperationEnum.READ,
})(PlayerViewPage);
