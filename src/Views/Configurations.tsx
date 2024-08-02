import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Autocomplete,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddConfiguration, GetAllBuildingType, GetAllConfiguration } from '../Redux/Slice/Reducer';
import { BuildingType, JoinedResult } from '../Redux/Slice/Model/ConfigurationModel';

interface Configuration {
  oId: string;
  buildingType: string;
  buildingCost: number;
  constructionTime: number;
}

const ConfigurationsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [buildingType, setBuildingType] = useState<BuildingType | null>(null);
  const [buildingCost, setBuildingCost] = useState<number | null>(null);
  const [constructionTime, setConstructionTime] = useState<number | null>(null);
  const [errors, setErrors] = useState({ buildingCost: '', constructionTime: '' });
  const { Configurations, BuildingTypes } = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetAllConfiguration());
      await dispatch(GetAllBuildingType());
    };

    fetchData();
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const newErrors = { buildingCost: '', constructionTime: '' };

    if (buildingCost === null || buildingCost < 0) {
      newErrors.buildingCost = 'Negatif veya 0 olamaz';
    }

    if (constructionTime === null || constructionTime < 30 || constructionTime > 1800) {
      newErrors.constructionTime = '30-1800 arası saniye girilmelidir';
    }

    setErrors(newErrors);

    if (!newErrors.buildingCost && !newErrors.constructionTime && buildingType) {
      const newConfig: Configuration = {
        oId: "",
        buildingType: buildingType.oId,
        buildingCost: buildingCost || 0,
        constructionTime: constructionTime || 0,
      };

      await dispatch(AddConfiguration(newConfig));
      await dispatch(GetAllConfiguration());

      // Form alanlarını sıfırla
      setBuildingType(null);
      setBuildingCost(null);
      setConstructionTime(null);
      setErrors({ buildingCost: '', constructionTime: '' });

      handleClose();
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 'auto', textAlign: 'end', padding: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Konfigürasyon Ekle
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {(Configurations || []).map((config: JoinedResult, index: number) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`Bina Türü: ${config.buildingType.name}`}
                secondary={`Maaliyet: ₺${config.configuration.buildingCost} | Zaman: ${config.configuration.constructionTime} saniye`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Konfigürasyon Ekle
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Autocomplete
                options={BuildingTypes || []}
                getOptionLabel={(option: BuildingType) => option.name || ''}
                value={buildingType}
                onChange={(event, value) => setBuildingType(value || null)}
                renderInput={(params) => <TextField {...params} label="Bina Türü Seçin" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="İnşaat Maaliyeti Girin"
                type="number"
                variant="outlined"
                fullWidth
                value={buildingCost || ''}
                onChange={(e) => setBuildingCost(Number(e.target.value))}
                error={!!errors.buildingCost}
                helperText={errors.buildingCost}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="İnşaat Süresi Girin (saniye)"
                type="number"
                variant="outlined"
                fullWidth
                value={constructionTime || ''}
                onChange={(e) => setConstructionTime(Number(e.target.value))}
                error={!!errors.constructionTime}
                helperText={errors.constructionTime}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Kaydet
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
              Kapat
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ConfigurationsPage;
