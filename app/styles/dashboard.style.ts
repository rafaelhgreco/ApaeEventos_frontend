import { Dimensions, StyleSheet } from 'react-native';

export const themeColors = {
  background: '#F8FAFC', // mais clean
  card: '#FFFFFF',
  primary: '#1E293B', // slate 800
  secondary: '#64748B', // slate 500
  accent: '#3B82F6', // azul vibrante
  muted: '#94A3B8', // slate 400
  border: '#E2E8F0',

  tabBg: '#E2E8F0',
  tabActive: '#FFFFFF',
  tabBorder: '#CBD5E1',
};

export const screenWidth = Dimensions.get('window').width;

/* 🎨 CHART CONFIG MODERNO */
export const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`, // slate 800
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  strokeWidth: 3,

  propsForLabels: {
    fontSize: 12,
    fontWeight: '600',
  },

  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#3B82F6',
  },

  style: {
    borderRadius: 20,
  },
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  scrollView: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: themeColors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: themeColors.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },

  /* ⭐ TABS MODERNAS */
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: themeColors.tabBg,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: themeColors.tabBorder,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  tabActive: {
    backgroundColor: themeColors.tabActive,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: themeColors.primary,
  },

  /* ⭐ CARDS MODERNOS */
  card: {
    backgroundColor: themeColors.card,
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 24,
    minHeight: 260,
  },

  chart: {
    marginVertical: 8,
    borderRadius: 20,
  },

  /* PLACEHOLDER */
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  placeholderText: {
    marginTop: 16,
    fontSize: 15,
    color: themeColors.muted,
    textAlign: 'center',
  },

  /* ⭐ LISTA */
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: themeColors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: themeColors.border,
    marginBottom: 12,
  },

  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.primary,
  },

  listSub: {
    fontSize: 13,
    color: themeColors.secondary,
    marginTop: 4,
  },

  /* ⭐ CARDS PEQUENOS */
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  cardSmall: {
    flex: 1,
    backgroundColor: themeColors.card,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },

  cardLabel: {
    fontSize: 13,
    color: themeColors.secondary,
    marginBottom: 4,
    fontWeight: '500',
  },

  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: themeColors.primary,
  },
});
