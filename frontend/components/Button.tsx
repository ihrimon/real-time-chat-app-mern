import { colors, radius } from '@/constants/theme';
import { ButtonProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from './Loading';

const Button = ({ style, onPress, children, loading = false }: ButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
        <Loading />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    borderCurve: 'continuous',
    height: verticalScale(56),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: verticalScale(16),
    fontWeight: '600',
  },
});
