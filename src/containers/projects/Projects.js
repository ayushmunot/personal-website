import React, { useState, useEffect } from "react"
// import React, { useState, useEffect, Suspense } from "react"
// import loadable from '@loadable/component'
import ApolloClient from "apollo-boost"
import { gql } from "apollo-boost"
import { Fade } from "react-reveal"

import "./Project.css"
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard"
import Button from "../../components/button/Button"
// import Loading from "../loading/Loading"
import { openSource } from "../../portfolio"

export default function Projects() {
  
  // const GithubRepoCard = loadable(() => import("../../components/githubRepoCard/GithubRepoCard"))
  // const FailedLoading = () => null
  // const RenderLoader = () => <Loading />
  const [repo, setRepo] = useState([])

  useEffect(() => {
    getRepoData()
  }, [])
  
  function setRepoFunction(array) {
    console.log(array);
    setRepo(array)
  }

  function getRepoData() {
    console.log(openSource.githubConvertedToken);
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${openSource.githubConvertedToken}`
          }
        })
      }
    })

    client
      .query({
        query: gql`
          {
            user(login: "${openSource.githubUserName}") {
              pinnedItems(first: 6, types: [REPOSITORY]) {
                totalCount
                edges {
                  node {
                    ... on Repository {
                      name
                      description
                      forkCount
                      stargazers {
                        totalCount
                      }
                      url
                      id
                      primaryLanguage {
                        name
                        color
                      }
                    }
                  }
                }
              }
            }
          }
        `
      })
      .then(result => {
        setRepoFunction(result.data.user.pinnedItems.edges)
      })
      // .catch(function (error) {
      //   setRepoFunction("Error")
      // })
  }
  
  // if (!(typeof repo === 'string' || repo instanceof String)) {
  return (
    // <Suspense fallback={RenderLoader()}>
    <Fade bottom cascade duration={1000} distance="20px">
      <div className="main" id="work">
        <h1 className="project-title">Some Things I've Built</h1>
        <div className="repo-cards-div-main">
          {repo.map((v, i) => {
            return <GithubRepoCard repo={v} key={v.node.id} />
          })}
        </div>
        <Button text={"More Projects"} className="project-button" href="https://github.com/ayushmunot" newTab={true} />
      </div>
    </Fade>
    // </Suspense>
  )
  // } else {
  //   return(<FailedLoading />)
  // }
}