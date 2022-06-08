import {Box, IconButton, Paper, styled, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { urlForThumbnail } from '../../utils/image'
import { addCommas, removeNonNumeric } from '../../utils/format'

const UpsideBox = styled(Box)({
  position: 'relative',
  ":hover": {
    "& .MuiBox-root" : {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, .5)',
      transition: 'all 200ms ease',
    }
  }
})

export default function Product({product = {}}) {
  const navigate = useNavigate()

  function goToDetail() {
    navigate(`/${product.category}/${product.slug}`)
  }

  return (
    <Paper sx={{ maxWidth: '300px' }}>
      <UpsideBox>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'none',
          display: 'none',
        }}>
            <IconButton color='primary'><ShoppingCartIcon /></IconButton>
            <IconButton color='primary' onClick={() => goToDetail()}><VisibilityIcon /></IconButton>
        </Box>
        <Box
          component="img"
          src={urlForThumbnail(product.images[0].asset)}
          alt="Paella dish"
        />
      </UpsideBox>
      <Box sx={{ p: 3 }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
          <Typography variant='body1' fontWeight='bold'>{product.title}</Typography>
          <IconButton>
            <FavoriteBorderIcon/>
          </IconButton>
        </Box>
        <Box sx={{display: 'flex'}}>
          <Typography variant='body1' sx={{ textDecoration: 'line-through' }} fontWeight='bold' color='primary.main'>${addCommas(removeNonNumeric(product.lastPrice))}</Typography>
          <Typography sx={{mx: 2}} fontWeight='bold' variant='body1'>${addCommas(removeNonNumeric(product.price))}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}