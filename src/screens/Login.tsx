import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useFormik } from 'formik'; // IMPORTAÇÃO DO HOOK DO FORMIK
import * as Yup from 'yup';         // IMPORTAÇÃO DO YUP
import { Kanban } from 'lucide-react-native'; 
import { theme } from '../styles/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

// ETAPA 2: Esquema de validação com o Yup
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido.')
    .required('O e-mail é obrigatório.'),
  password: Yup.string()
    .min(6, 'A senha deve conter pelo menos 6 caracteres.')
    .required('A senha é obrigatória.'),
});

export const Login: React.FC = () => {
  const { login } = useAuth();

  // ETAPA 3: Configuração do Formik para gerenciar o formulário automaticamente
  const formik = useFormik({
    initialValues: { email: '', password: '' }, // Valores iniciais dos campos
    validationSchema: loginValidationSchema,    // Conecta as regras do Yup aqui
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Extrai o nome baseado na primeira parte do e-mail para personificar a Home
        const guessedName = values.email.split('@')[0]; 
        await login(values.email, guessedName);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false); // Desativa o estado de loading do botão
      }
    },
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* LOGO DO APP */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Kanban size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.title}>Mylist</Text>
          <Text style={styles.subtitle}>Seu organizador de notas e rotinas com validação profissional.</Text>
        </View>

        {/* FORMULÁRIO CONTROLADO PELO FORMIK */}
        <View style={styles.formCard}>
          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formik.values.email} // O Formik controla o valor
            onChangeText={formik.handleChange('email')} // O Formik escuta a mudança
            onBlur={formik.handleBlur('email')} // O Formik detecta quando o usuário sai do campo
            error={formik.touched.email ? formik.errors.email : undefined} // Só mostra o erro se o usuário já clicou no campo
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            autoCapitalize="none"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.touched.password ? formik.errors.password : undefined}
          />

          <TouchableOpacity style={styles.forgotPasswordButton} activeOpacity={0.6}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          {/* O botão recebe o handleSubmit do Formik e o estado de isSubmitting para o loading */}
          <Button 
            title="Entrar" 
            loading={formik.isSubmitting} 
            onPress={() => formik.handleSubmit()} 
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.registerText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.backgroundPrimary },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  iconBackground: { backgroundColor: '#E6EFFC', padding: 16, borderRadius: theme.borderRadius.large, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.textPrimary },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 6, paddingHorizontal: 20 },
  formCard: { backgroundColor: theme.colors.backgroundSecondary, padding: 20, borderRadius: theme.borderRadius.large, borderWidth: 1, borderColor: theme.colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  forgotPasswordButton: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { fontSize: 14, color: theme.colors.primary, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: theme.colors.textSecondary, fontSize: 14 },
  registerText: { color: theme.colors.primary, fontSize: 14, fontWeight: 'bold' },
});