import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Waves, TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface StreamFlowCardProps {
  locationName: string;
}

export default function StreamFlowCard({ locationName }: StreamFlowCardProps) {
  // Mock stream flow data
  const streamData = {
    currentFlow: 245,
    averageFlow: 180,
    trend: 'rising',
    lastUpdated: new Date(),
    status: 'normal'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return '#dc2626';
      case 'normal': return '#059669';
      case 'high': return '#d97706';
      case 'flood': return '#7f1d1d';
      default: return '#6b7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp size={16} color="#059669" />;
      case 'falling': return <TrendingDown size={16} color="#dc2626" />;
      default: return <Minus size={16} color="#6b7280" />;
    }
  };

  const getFlowPercentage = () => {
    return Math.min((streamData.currentFlow / (streamData.averageFlow * 2)) * 100, 100);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Waves size={18} color="#2563eb" />
          <Text style={styles.title}>{locationName}</Text>
        </View>
        <View style={styles.trend}>
          {getTrendIcon(streamData.trend)}
          <Text style={styles.trendText}>
            {streamData.trend.charAt(0).toUpperCase() + streamData.trend.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.flowData}>
        <View style={styles.currentFlow}>
          <Text style={styles.flowValue}>{streamData.currentFlow}</Text>
          <Text style={styles.flowUnit}>CFS</Text>
        </View>
        <View style={styles.comparison}>
          <Text style={styles.comparisonText}>
            vs. avg {streamData.averageFlow} CFS
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(streamData.status) }]}>
            <Text style={styles.statusText}>
              {streamData.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.flowBar}>
        <View style={styles.flowBarBackground}>
          <View 
            style={[
              styles.flowBarFill, 
              { 
                width: `${getFlowPercentage()}%`,
                backgroundColor: getStatusColor(streamData.status)
              }
            ]} 
          />
        </View>
        <View style={styles.flowBarLabels}>
          <Text style={styles.flowBarLabel}>0</Text>
          <Text style={styles.flowBarLabel}>Avg</Text>
          <Text style={styles.flowBarLabel}>Max</Text>
        </View>
      </View>

      <Text style={styles.lastUpdated}>
        Last updated: {streamData.lastUpdated.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
  },
  flowData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentFlow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  flowValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  flowUnit: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  comparison: {
    alignItems: 'flex-end',
  },
  comparisonText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  flowBar: {
    marginBottom: 12,
  },
  flowBarBackground: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  flowBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  flowBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  flowBarLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  lastUpdated: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
});