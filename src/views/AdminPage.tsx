import { useContext } from 'react';
import { userContext } from '../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserCollection from '../containers/UserCollection.tsx';

const AdminPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(userContext);
  const isAdmin = userDetails?.roles?.includes('ADMIN');
  const isModerator = userDetails?.roles?.includes('MODERATOR');

  if (!userDetails || (!isAdmin && !isModerator)) {
    console.log('not getting let through');
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>{isAdmin ? 'Admin Section' : 'Moderation Section'}</h1>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="approve-users-content"
          id="approve-users-header"
        >
          <Typography>Approve Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserCollection />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="monitor-posts-content"
          id="monitor-posts-header"
        >
          <Typography>Monitor Posts</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdminPage;
