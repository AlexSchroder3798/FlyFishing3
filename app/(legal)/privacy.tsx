import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Eye, Database, Lock, Mail } from 'lucide-react-native';

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Shield size={48} color="#2563eb" />
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </Text>
          <Text style={styles.lastUpdated}>Last updated: June 2025</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Information We Collect</Text>
          </View>
          <Text style={styles.sectionContent}>
            We collect information you provide directly to us, such as when you create an account, log your fishing catches, or contact us for support. This includes:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Account information (email, username, profile details)</Text>
            <Text style={styles.bulletPoint}>• Fishing logs and catch records</Text>
            <Text style={styles.bulletPoint}>• Location data when you choose to share it</Text>
            <Text style={styles.bulletPoint}>• Photos and content you upload</Text>
            <Text style={styles.bulletPoint}>• Communication preferences and support requests</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Eye size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          </View>
          <Text style={styles.sectionContent}>
            We use the information we collect to provide, maintain, and improve our services:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Provide and personalize the FlyMaster experience</Text>
            <Text style={styles.bulletPoint}>• Track your fishing progress and statistics</Text>
            <Text style={styles.bulletPoint}>• Connect you with fishing locations and community</Text>
            <Text style={styles.bulletPoint}>• Send you updates about water conditions and hatches</Text>
            <Text style={styles.bulletPoint}>• Respond to your questions and provide customer support</Text>
            <Text style={styles.bulletPoint}>• Improve our app features and user experience</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lock size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Data Security</Text>
          </View>
          <Text style={styles.sectionContent}>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit and at rest using industry-standard protocols.
          </Text>
          <Text style={styles.sectionContent}>
            While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your data.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Your Rights</Text>
          </View>
          <Text style={styles.sectionContent}>
            You have the right to:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Access and update your personal information</Text>
            <Text style={styles.bulletPoint}>• Delete your account and associated data</Text>
            <Text style={styles.bulletPoint}>• Control your privacy settings and data sharing</Text>
            <Text style={styles.bulletPoint}>• Opt out of marketing communications</Text>
            <Text style={styles.bulletPoint}>• Request a copy of your data</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Data Sharing</Text>
          </View>
          <Text style={styles.sectionContent}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• With your explicit consent</Text>
            <Text style={styles.bulletPoint}>• To comply with legal obligations</Text>
            <Text style={styles.bulletPoint}>• To protect our rights and prevent fraud</Text>
            <Text style={styles.bulletPoint}>• With service providers who help us operate the app</Text>
            <Text style={styles.bulletPoint}>• As part of aggregated, anonymized data used to improve our app</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database size={20} color="#2563eb" />
              <Text style={styles.sectionTitle}>Data Retention</Text>
          </View>
            <Text style={styles.sectionContent}>
              We retain your personal information only for as long as necessary to provide you with our services and as described in this Privacy Policy. You may request deletion of your data at any time.
            </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Mail size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Contact Us</Text>
          </View>
          <Text style={styles.sectionContent}>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Email: flymaster.site@gmail.com</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This Privacy Policy may be updated from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
      default: {},
    }),
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  lastUpdated: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  bulletPoints: {
    marginLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  contactInfo: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginBottom: 4,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 18,
    textAlign: 'center',
  },
});