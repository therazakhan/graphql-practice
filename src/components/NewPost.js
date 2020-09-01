import React from "react";
import PostForm from "./PostForm";
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

const CREATE_POST = gql`
    mutation CreatePost($body: String!, $title: String!) {
        insert_posts(objects: {body: $body, title: $title}) {
        affected_rows
        }
    }  
`;

function NewPost() {
    const history = useHistory();

    const [createPost, { loading, error }] = useMutation(CREATE_POST, {
        onCompleted: () => history.push('/')
    });

    function onSave({ title, body }) {
        createPost({ variables: { title, body } });
    }

    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <header className="bg-gray-300 text-gray-700 py-3 px-4">
                <h2 className="text-sm font-semibold">New Post</h2>
            </header>
            <div className="bg-gray-100 p-4">
                <PostForm onSave={onSave} loading={loading} error={error} />
            </div>
        </div>
    );
}

export default NewPost;
