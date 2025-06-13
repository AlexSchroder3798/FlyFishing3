import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Users, TriangleAlert as AlertTriangle, Scale, Mail } from 'lucide-react-native';

export default function TermsAndConditions() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <FileText size={48} color="#2563eb" />
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.subtitle}>
            Please read these terms carefully before using FlyMaster. By using our app, you agree to these terms.
          </Text>
          <Text style={styles.lastUpdated}>Last updated: January 2025</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
          </View>
          <Text style={styles.sectionContent}>
            By accessing and using FlyMaster, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </Text>
          <Text style={styles.sectionContent}>
            These terms apply to all users of the app, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Use License</Text>
          </View>
          <Text style={styles.sectionContent}>
            Permission is granted to temporarily use FlyMaster for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Modify or copy the materials</Text>
            <Text style={styles.bulletPoint}>• Use the materials for any commercial purpose or for any public display</Text>
            <Text style={styles.bulletPoint}>• Attempt to reverse engineer any software contained in the app</Text>
            <Text style={styles.bulletPoint}>• Remove any copyright or other proprietary notations from the materials</Text>
            <Text style={styles.bulletPoint}>• Use the app in a way that misrepresents fishing regulations or promotes illegal fishing activity</Text>

          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>User Accounts</Text>
          </View>
          <Text style={styles.sectionContent}>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
          </Text>
          <Text style={styles.sectionContent}>
            You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Content Guidelines</Text>
          </View>
          <Text style={styles.sectionContent}>
            Users may post fishing reports, photos, and other content. By posting content, you grant us a non-exclusive, royalty-free license to use, modify, and display such content. You are responsible for ensuring that your content:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Does not violate any laws or regulations</Text>
            <Text style={styles.bulletPoint}>• Does not infringe on others' intellectual property rights</Text>
            <Text style={styles.bulletPoint}>• Is not offensive, harmful, or inappropriate</Text>
            <Text style={styles.bulletPoint}>• Does not contain false or misleading information</Text>
            <Text style={styles.bulletPoint}>• Respects fishing regulations and conservation practices</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color="#dc2626" />
            <Text style={styles.sectionTitle}>Prohibited Uses</Text>
          </View>
          <Text style={styles.sectionContent}>
            You may not use FlyMaster for any unlawful purpose or to solicit others to perform unlawful acts. You may not:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Violate any local, state, national, or international law</Text>
            <Text style={styles.bulletPoint}>• Transmit or procure the sending of any advertising or promotional material</Text>
            <Text style={styles.bulletPoint}>• Impersonate or attempt to impersonate another user</Text>
            <Text style={styles.bulletPoint}>• Use the app in any way that could damage or overburden our servers</Text>
            <Text style={styles.bulletPoint}>• Attempt to gain unauthorized access to any part of the app</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Scale size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Disclaimer</Text>
          </View>
          <Text style={styles.sectionContent}>
            The information on this app is provided on an 'as is' basis. To the fullest extent permitted by law, FlyMaster excludes all representations, warranties, conditions and terms relating to our app and the use of this app.
          </Text>
          <Text style={styles.sectionContent}>
            Fishing conditions, water levels, and other environmental data are provided for informational purposes only. Always check local conditions and regulations before fishing. FlyMaster is not responsible for any accidents, injuries, or violations that may occur.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color="#dc2626" />
            <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          </View>
          <Text style={styles.sectionContent}>
            In no event shall FlyMaster or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FlyMaster's app.
          </Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Scale size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Governing Law</Text>
          </View>
            <Text style={styles.sectionContent}>
              These terms and conditions are governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions.
            </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Modifications</Text>
          </View>
          <Text style={styles.sectionContent}>
            FlyMaster may revise these terms of service at any time without notice. By using this app, you are agreeing to be bound by the then current version of these terms of service.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Mail size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Contact Information</Text>
          </View>
          <Text style={styles.sectionContent}>
            If you have any questions about these Terms and Conditions, please contact us at:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Email: flymaster.site@gmail.com</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            These terms and conditions are effective as of the last updated date. Your continued use of FlyMaster after any changes indicates your acceptance of the new terms.
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