import { useContext, useMemo, useState } from 'react';
import { userContext } from '../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserCollection from '../containers/UserCollection.tsx';
import PostCollection from '../containers/PostCollection.tsx';
import useFetch from '../hooks/useFetch.ts';
import config from '../config.ts';

const AdminPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(userContext);
  const isAdmin = userDetails?.roles?.includes('ADMIN');
  const isModerator = userDetails?.roles?.includes('MODERATOR');
  const [orgId, setOrgId] = useState('0');
  const options = useMemo(() => ({}), []);
  const { data: organisations } = useFetch(`${config.apiEndpoint}/organisations`, options);

  const handleChange = async (e: SelectChangeEvent) => {
    setOrgId(e.target.value);
  };

  if (!userDetails || (!isAdmin && !isModerator)) {
    console.log('not getting let through');
    navigate('/');
    return null;
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl my-5">{isAdmin ? 'Admin Section' : 'Moderation Section'}</h1>
        {isAdmin ? (
          <form>
            <FormControl fullWidth margin="normal">
              <InputLabel id="my-select-label">Choose an Organisation</InputLabel>
              <Select
                labelId="organisation"
                id="organisationId"
                name="organisationId"
                label="Choose an Organisation"
                value={orgId}
                onChange={handleChange}
                className="bg-white"
              >
                <MenuItem key={0} value={'0'}>
                  Your Organisation
                </MenuItem>
                {Array.isArray(organisations) &&
                  organisations.map((org) => (
                    <MenuItem key={org.id} value={org.id.toString()}>
                      {org.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        ) : null}
      </div>
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
        <AccordionDetails>
          <div className="bg-green-800">
            <PostCollection passedType="organisation" organisationId={parseInt(orgId)} />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdminPage;
