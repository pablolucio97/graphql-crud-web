import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type CreatePhotoInput = {
  isPrivate: Scalars['Boolean']['input'];
  likes: Scalars['Float']['input'];
  url: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DeletePhotoInput = {
  id: Scalars['String']['input'];
};

export type DeleteUserInput = {
  id: Scalars['String']['input'];
};

export type GetPhotoInput = {
  id: Scalars['String']['input'];
};

export type GetPhotosByUserInput = {
  userId: Scalars['String']['input'];
};

export type GetUserInput = {
  id: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPhoto: Photo;
  createUser: User;
  deletePhoto?: Maybe<Photo>;
  deleteUser?: Maybe<User>;
  updatePhoto?: Maybe<Photo>;
  updateUser: User;
};


export type MutationCreatePhotoArgs = {
  data: CreatePhotoInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeletePhotoArgs = {
  data: DeletePhotoInput;
};


export type MutationDeleteUserArgs = {
  data: DeleteUserInput;
};


export type MutationUpdatePhotoArgs = {
  data: UpdatePhotoInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

/** photo */
export type Photo = {
  __typename?: 'Photo';
  id: Scalars['ID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  postedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getPhoto: Photo;
  getPhotosByUser: Array<Photo>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
  listPhotos: Array<Photo>;
};


export type QueryGetPhotoArgs = {
  data: GetPhotoInput;
};


export type QueryGetPhotosByUserArgs = {
  data: GetPhotosByUserInput;
};


export type QueryGetUserArgs = {
  data: GetUserInput;
};

export type UpdatePhotoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Boolean']['input'];
  likes: Scalars['Float']['input'];
};

export type UpdateUserInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** user */
export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ListPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPhotosQuery = { __typename?: 'Query', listPhotos: Array<{ __typename?: 'Photo', id: string, url: string, likes: number, isPrivate: boolean }> };

export type GetPhotosByUserQueryVariables = Exact<{
  data: GetPhotosByUserInput;
}>;


export type GetPhotosByUserQuery = { __typename?: 'Query', getPhotosByUser: Array<{ __typename?: 'Photo', id: string, url: string, likes: number, isPrivate: boolean }> };

export type CreatePhotoMutationVariables = Exact<{
  data: CreatePhotoInput;
}>;


export type CreatePhotoMutation = { __typename?: 'Mutation', createPhoto: { __typename?: 'Photo', url: string, likes: number, isPrivate: boolean, postedAt: Date, userId: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string, email: string }> };

export type GetUserQueryVariables = Exact<{
  data: GetUserInput;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, name: string, email: string } | null };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', name: string, email: string } };

export type DeleteUserMutationVariables = Exact<{
  data: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: string } | null };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string } };


export const ListPhotosDocument = gql`
    query ListPhotos {
  listPhotos {
    id
    url
    likes
    isPrivate
  }
}
    `;

/**
 * __useListPhotosQuery__
 *
 * To run a query within a React component, call `useListPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPhotosQuery(baseOptions?: Apollo.QueryHookOptions<ListPhotosQuery, ListPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPhotosQuery, ListPhotosQueryVariables>(ListPhotosDocument, options);
      }
export function useListPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPhotosQuery, ListPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPhotosQuery, ListPhotosQueryVariables>(ListPhotosDocument, options);
        }
export function useListPhotosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPhotosQuery, ListPhotosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPhotosQuery, ListPhotosQueryVariables>(ListPhotosDocument, options);
        }
export type ListPhotosQueryHookResult = ReturnType<typeof useListPhotosQuery>;
export type ListPhotosLazyQueryHookResult = ReturnType<typeof useListPhotosLazyQuery>;
export type ListPhotosSuspenseQueryHookResult = ReturnType<typeof useListPhotosSuspenseQuery>;
export type ListPhotosQueryResult = Apollo.QueryResult<ListPhotosQuery, ListPhotosQueryVariables>;
export const GetPhotosByUserDocument = gql`
    query GetPhotosByUser($data: GetPhotosByUserInput!) {
  getPhotosByUser(data: $data) {
    id
    url
    likes
    isPrivate
  }
}
    `;

/**
 * __useGetPhotosByUserQuery__
 *
 * To run a query within a React component, call `useGetPhotosByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotosByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotosByUserQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPhotosByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPhotosByUserQuery, GetPhotosByUserQueryVariables> & ({ variables: GetPhotosByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPhotosByUserQuery, GetPhotosByUserQueryVariables>(GetPhotosByUserDocument, options);
      }
export function useGetPhotosByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPhotosByUserQuery, GetPhotosByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPhotosByUserQuery, GetPhotosByUserQueryVariables>(GetPhotosByUserDocument, options);
        }
export function useGetPhotosByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPhotosByUserQuery, GetPhotosByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPhotosByUserQuery, GetPhotosByUserQueryVariables>(GetPhotosByUserDocument, options);
        }
export type GetPhotosByUserQueryHookResult = ReturnType<typeof useGetPhotosByUserQuery>;
export type GetPhotosByUserLazyQueryHookResult = ReturnType<typeof useGetPhotosByUserLazyQuery>;
export type GetPhotosByUserSuspenseQueryHookResult = ReturnType<typeof useGetPhotosByUserSuspenseQuery>;
export type GetPhotosByUserQueryResult = Apollo.QueryResult<GetPhotosByUserQuery, GetPhotosByUserQueryVariables>;
export const CreatePhotoDocument = gql`
    mutation CreatePhoto($data: CreatePhotoInput!) {
  createPhoto(data: $data) {
    url
    likes
    isPrivate
    postedAt
    userId
  }
}
    `;
export type CreatePhotoMutationFn = Apollo.MutationFunction<CreatePhotoMutation, CreatePhotoMutationVariables>;

/**
 * __useCreatePhotoMutation__
 *
 * To run a mutation, you first call `useCreatePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPhotoMutation, { data, loading, error }] = useCreatePhotoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePhotoMutation(baseOptions?: Apollo.MutationHookOptions<CreatePhotoMutation, CreatePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePhotoMutation, CreatePhotoMutationVariables>(CreatePhotoDocument, options);
      }
export type CreatePhotoMutationHookResult = ReturnType<typeof useCreatePhotoMutation>;
export type CreatePhotoMutationResult = Apollo.MutationResult<CreatePhotoMutation>;
export type CreatePhotoMutationOptions = Apollo.BaseMutationOptions<CreatePhotoMutation, CreatePhotoMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($data: GetUserInput!) {
  getUser(data: $data) {
    id
    name
    email
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    name
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($data: DeleteUserInput!) {
  deleteUser(data: $data) {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    id
    name
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;