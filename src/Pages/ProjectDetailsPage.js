import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Container, Box, Grid, Button } from '@mui/material'
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded'
import Error from '../Components/Common/Error'
import ProjectLinksComponent from '../Components/ProjectLinksComponent'
import ProjectFilesComponent from '../Components/ProjectFilesComponent'
import TeamMembersContainer from '../Components/TeamMembers/TeamMembersContainer'
import ProjectTechnologiesContainer from '../Components/ProjectTechnologies/ProjectTechnologiesContainer'
import AmdocsPoductContainer from '../Components/AmdoctProduct/AmdocsPoductContainer'
import ProjectTitleComponent from '../Components/ProjectTitleComponent'
import ProjectDescriptionComponent from '../Components/ProjectDescriptionComponent'

function ProjectDetailsPage() {
  //TODO: Check if project name exist, it not put message to user and button to redirect to homepage
  const projects = useSelector((state) => state.projects)
  const navigate = useNavigate()

  const { id } = useParams() //get project name from url

  const currentProject = projects?.find((pro) => {
    return pro.name === id
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Container>
        <Box mt={5} mb={5}>
          <Button
            size="small"
            onClick={() => {
              navigate('/', { replace: true })
            }}
          >
            <ArrowLeftRoundedIcon />
            Back
          </Button>
          {currentProject ? (
            <Grid container spacing={5} direction="column" alignItems="center">
              <ProjectTitleComponent name={currentProject.name} />
              <ProjectDescriptionComponent
                description={currentProject.description}
                imgUrl={currentProject.imgUrl}
              />
              <AmdocsPoductContainer amdocsProduct={currentProject.amdocsProduct} />
              <ProjectTechnologiesContainer technologies={currentProject.technologies} />
              <TeamMembersContainer teamMembers={currentProject.teamMembers} />
              <ProjectLinksComponent links={currentProject.links} />
              <ProjectFilesComponent files={currentProject.files} />
            </Grid>
          ) : (
            <Error message={`Unable to find project name: ${id}`} />
          )}
        </Box>
      </Container>
    </>
  )
}

export default ProjectDetailsPage
