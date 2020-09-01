import React from "react";
import PostForm from "./PostForm";
import { gql } from "apollo-boost";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

const classes = {
    div: "bg-white border rounded-lg overflow-hidden",
    header: "bg-gray-300 text-gray-700 py-3 px-4",
    h2: "text-sm font-semibold"
};

const GET_POST_BY_ID = gql`
    query GetPostById($id: uuid!) {
        posts_by_pk(id: $id) {
        id
        body
        createdAt
        title
        }
    }
`;

const UPDATE_POST = gql`
    mutation UpdatePost($id: uuid!, $title: String!, $body: String!) {
        update_posts(where: {id: {_eq: $id}}, _set: {body: $body, title: $title}) {
        returning {
            body
            title
        }
        }
    }
`;

function EditPost() {
    const { id } = useParams();
    const history = useHistory();

    const [updatePost] = useMutation(UPDATE_POST, {
        onCompleted: () => history.push('/')
    });
    
    const { loading, data } = useQuery(GET_POST_BY_ID, { variables: { id } });

    if (loading) return <div>Loading ...</div>;

    function onSave({ title, body }) {
        updatePost({
            variables: {
                id,
                title,
                body
            }
        })
    }

    return (
        <div className={classes.div}>
            <header className={classes.header}>
                <h2 className={classes.h2}>Edit Post</h2>
            </header>
            <PostForm post={data.posts_by_pk} onSave={onSave} />
        </div>
    );
}

export default EditPost;
