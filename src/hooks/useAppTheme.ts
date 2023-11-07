import {useTheme} from 'react-native-paper';
import {AppTheme} from '../constants/theme';

export const useAppTheme = () => useTheme<AppTheme>();
