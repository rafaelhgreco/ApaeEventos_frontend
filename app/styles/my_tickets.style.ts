import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 22,
  },
  price: {
    fontSize: 16,
    color: '#047857',
    fontWeight: '600',
    marginBottom: 6,
  },
  status: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 12,
  },
  qrBox: {
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
  },
  qrImage: {
    width: 180,
    height: 180,
    marginBottom: 8,
  },
  code: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  missingQr: {
    textAlign: 'center',
    color: '#DC2626',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});
