import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Grid } from '@material-ui/core';
import { ImagePicker } from 'react-file-picker';
import {useHttp} from '../../../services/http.service';
import {useAuth} from '../../../services/auth.service';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PhotoList = ({photos, setPhotos, side}) => {
  const classes = useStyles();
  const {user} = useAuth();
  const http = useHttp('photo');

  return (
    <List dense className={classes.root}>
      <Grid container direction="column" alignItems="center">
      {photos.map(photo => (
          <ListItem key={photo} button>
            <ListItemAvatar>
              <Avatar
                src={`${user.username}/${side}/${photo}`}
              />
            </ListItemAvatar>
            <ListItemText primary={photo} />
          </ListItem>
        )
      )}
        <ImagePicker
          extensions={['jpg']}
          dims={{minWidth: 0, maxWidth: 4000, minHeight: 0, maxHeight: 4000}}
          onChange={file => {
            http.post('', {side, img: file, name: photos.length + 1});
            setPhotos(photos => [...photos, `${photos.length + 1}.jpg`]);
          }}
          onError={errMsg => console.log(errMsg)}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </ImagePicker>
      </Grid>
    </List>
  );
};