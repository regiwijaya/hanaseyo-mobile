import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

import { AppCard } from "../../components/AppCard";
import { AppText } from "../../components/AppText";
import { SpeakerButton } from "../../components/SpeakerButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { PronunciationActivity as PronunciationActivityType } from "../../types/curriculum";

type PronunciationActivityProps = {
  activity: PronunciationActivityType;
};

export function PronunciationActivity({
  activity,
}: PronunciationActivityProps) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder, 250);
  const audioPlayer = useAudioPlayer(null);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  useEffect(() => {
    async function prepareAudio() {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      setHasPermission(permission.granted);

      if (!permission.granted) {
        Alert.alert(
          "Izin mikrofon diperlukan",
          "Aktifkan izin mikrofon agar bisa memakai latihan rekaman suara."
        );
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    }

    prepareAudio();
  }, []);

  async function startRecording() {
    try {
      let allowed = hasPermission;

      if (!allowed) {
        const permission = await AudioModule.requestRecordingPermissionsAsync();
        allowed = permission.granted;
        setHasPermission(permission.granted);
      }

      if (!allowed) {
        Alert.alert(
          "Mikrofon belum diizinkan",
          "Silakan izinkan akses mikrofon dari pengaturan perangkat."
        );
        return;
      }

      setRecordingUri(null);

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (error) {
      console.warn("Failed to start recording:", error);
      Alert.alert("Gagal merekam", "Terjadi masalah saat mulai merekam suara.");
    }
  }

  async function stopRecording() {
    try {
      await audioRecorder.stop();

      if (audioRecorder.uri) {
        setRecordingUri(audioRecorder.uri);
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: false,
      });
    } catch (error) {
      console.warn("Failed to stop recording:", error);
      Alert.alert(
        "Gagal menghentikan rekaman",
        "Terjadi masalah saat menyimpan rekaman."
      );
    }
  }

  async function playRecording() {
    if (!recordingUri) {
      return;
    }

    try {
      audioPlayer.replace({ uri: recordingUri });
      await audioPlayer.seekTo(0);
      audioPlayer.play();
    } catch (error) {
      console.warn("Failed to play recording:", error);
      Alert.alert(
        "Gagal memutar rekaman",
        "Terjadi masalah saat memutar ulang rekaman suara."
      );
    }
  }

  const durationSeconds = Math.round(recorderState.durationMillis / 1000);

  return (
    <View style={styles.container}>
      <AppCard style={styles.card}>
        <AppText variant="small" color={colors.textMuted} align="center">
          Latihan pengucapan
        </AppText>

        <AppText variant="heading" align="center" style={styles.title}>
          {activity.title}
        </AppText>

        <AppText color={colors.textMuted} align="center">
          {activity.instruction}
        </AppText>

        <View style={styles.targetBox}>
          <AppText variant="heading" align="center">
            {activity.targetText}
          </AppText>

          {activity.targetReading ? (
            <AppText color={colors.textMuted} align="center">
              {activity.targetReading}
            </AppText>
          ) : null}

          {activity.meaning ? (
            <AppText variant="small" color={colors.textMuted} align="center">
              {activity.meaning}
            </AppText>
          ) : null}
        </View>

        <SpeakerButton text={activity.audioText} label="Dengar contoh" />
      </AppCard>

      <AppCard>
        <AppText variant="subheading">Rekam suara Anda</AppText>

        <AppText color={colors.textMuted} style={styles.helperText}>
          Dengarkan contoh terlebih dahulu. Setelah itu tekan tombol rekam,
          ucapkan dengan jelas, lalu putar ulang untuk membandingkan.
        </AppText>

        <View style={styles.recordStatus}>
          <View
            style={[
              styles.recordDot,
              recorderState.isRecording ? styles.recordDotActive : null,
            ]}
          />

          <AppText color={colors.textMuted}>
            {recorderState.isRecording
              ? `Sedang merekam... ${durationSeconds} detik`
              : recordingUri
                ? "Rekaman tersedia"
                : "Belum ada rekaman"}
          </AppText>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.recordButton,
            recorderState.isRecording ? styles.stopButton : null,
            pressed ? styles.pressed : null,
          ]}
          onPress={recorderState.isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.recordButtonText}>
            {recorderState.isRecording ? "■ Stop Rekaman" : "● Mulai Rekam"}
          </Text>
        </Pressable>

        <Pressable
          disabled={!recordingUri || recorderState.isRecording}
          style={({ pressed }) => [
            styles.playButton,
            (!recordingUri || recorderState.isRecording) ? styles.disabledButton : null,
            pressed && recordingUri ? styles.pressed : null,
          ]}
          onPress={playRecording}
        >
          <Text
            style={[
              styles.playButtonText,
              (!recordingUri || recorderState.isRecording)
                ? styles.disabledText
                : null,
            ]}
          >
            ▶ Putar Rekaman Saya
          </Text>
        </Pressable>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  card: {
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    marginTop: spacing.xs,
  },
  targetBox: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  helperText: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  recordStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  recordDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.disabled,
  },
  recordDotActive: {
    backgroundColor: colors.danger,
  },
  recordButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  stopButton: {
    backgroundColor: colors.danger,
  },
  recordButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  playButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: "800",
  },
  disabledButton: {
    backgroundColor: "#F3F4F6",
    borderColor: colors.disabled,
  },
  disabledText: {
    color: colors.textMuted,
  },
  pressed: {
    opacity: 0.76,
  },
});