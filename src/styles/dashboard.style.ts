import { Dimensions, StyleSheet } from 'react-native';

export const themeColors = {
  background: '#F8FAFC',
  card: '#FFFFFF',

  primary: '#1E293B',
  secondary: '#64748B',
  accent: '#6366F1',

  muted: '#94A3B8',
  border: '#E2E8F0',

  tabBg: '#E2E8F0',
  tabActive: '#FFFFFF',
  tabBorder: '#CBD5E1',

  success: '#10B981',
  info: '#3B82F6',
};

export const screenWidth = Dimensions.get('window').width;

/* ---------------------------
   📊 Chart config visual
---------------------------- */
export const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  strokeWidth: 3,

  propsForLabels: {
    fontSize: 12,
    fontWeight: '600',
  },

  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#6366F1',
  },

  style: {
    borderRadius: 20,
  },
};

/* ---------------------------
   🧪 MAIN STYLES
---------------------------- */
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  scrollView: {
    flexGrow: 1,
    paddingBottom: 50,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  /* ---------------------------
      TITLES
  ---------------------------- */
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: themeColors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: themeColors.primary,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 15,
    color: themeColors.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },

  /* ---------------------------
      TABS
  ---------------------------- */
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
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: themeColors.primary,
  },

  /* ---------------------------
      HERO CARD (Próximo Evento)
  ---------------------------- */
  heroCard: {
    backgroundColor: themeColors.card,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 26,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },

  heroTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: themeColors.secondary,
  },

  heroEvent: {
    fontSize: 22,
    fontWeight: '700',
    color: themeColors.primary,
    marginTop: 4,
  },

  heroDate: {
    fontSize: 14,
    color: themeColors.muted,
    marginTop: 2,
  },

  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  heroStat: {
    flex: 1,
    alignItems: 'center',
  },

  heroStatLabel: {
    fontSize: 13,
    color: themeColors.secondary,
  },

  heroStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: themeColors.primary,
    marginTop: 4,
  },

  /* ---------------------------
      KPI CARDS
  ---------------------------- */
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  kpiCard: {
    flex: 1,
    backgroundColor: themeColors.card,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  kpiLabel: {
    fontSize: 13,
    color: themeColors.secondary,
    marginTop: 4,
  },

  kpiValue: {
    fontSize: 22,
    fontWeight: '700',
    color: themeColors.primary,
    marginTop: 6,
  },

  /* ---------------------------
      GENERAL CARD
  ---------------------------- */
  card: {
    backgroundColor: themeColors.card,
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    marginBottom: 24,
  },

  /* ---------------------------
      SPARKLINE
  ---------------------------- */
  sparkline: {
    height: 120,
    width: '100%',
  },

  /* ---------------------------
      RANKING LIST
  ---------------------------- */
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
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
    marginTop: 3,
  },

  /* ---------------------------
      SYSTEM STATUS
  ---------------------------- */
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  statusText: {
    marginLeft: 10,
    fontSize: 15,
    color: themeColors.primary,
  },

  /* ---------------------------
      PLACEHOLDER
  ---------------------------- */
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 15,
    color: themeColors.muted,
    textAlign: 'center',
  },
});
