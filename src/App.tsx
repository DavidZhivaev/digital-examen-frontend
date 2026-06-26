import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { LandingPage } from "@/features/landing/LandingPage"
import { LoginPage } from "@/features/auth/LoginPage"
import { PlaceholderPage } from "@/components/shared/PlaceholderPage"
import { SettingsPage } from "@/features/settings/SettingsPage"
import { TeacherContingentPage } from "@/features/contingent/TeacherContingentPage"
import { TeacherSeatingPage } from "@/features/seating/TeacherSeatingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AppLayout />}>
          {/* Student */}
          <Route path="/student" element={<Navigate to="/student/works" replace />} />
          <Route path="/student/works" element={<PlaceholderPage title="Мои работы" />} />
          <Route path="/student/bank" element={<PlaceholderPage title="Банк задач" />} />
          <Route path="/student/settings" element={<SettingsPage />} />

          {/* Teacher */}
          <Route path="/teacher" element={<Navigate to="/teacher/classes" replace />} />
          <Route path="/teacher/classes" element={<TeacherContingentPage />} />
          <Route path="/teacher/works" element={<PlaceholderPage title="Работы" />} />
          <Route path="/teacher/seating" element={<TeacherSeatingPage />} />
          <Route path="/teacher/bank" element={<PlaceholderPage title="Банк задач" />} />
          <Route path="/teacher/settings" element={<SettingsPage />} />

          {/* Operator */}
          <Route path="/operator" element={<Navigate to="/operator/users" replace />} />
          <Route path="/operator/users" element={<PlaceholderPage title="Контингент" />} />
          <Route path="/operator/works" element={<PlaceholderPage title="Работы" />} />
          <Route path="/operator/classrooms" element={<PlaceholderPage title="Аудитории" />} />
          <Route path="/operator/seating" element={<PlaceholderPage title="Рассадка" />} />
          <Route path="/operator/bank" element={<PlaceholderPage title="Банк задач" />} />
          <Route path="/operator/processing" element={<PlaceholderPage title="Обработка ЭМ" />} />
          <Route path="/operator/analytics" element={<PlaceholderPage title="Аналитика" />} />
          <Route path="/operator/settings" element={<SettingsPage />} />

          {/* Admin */}
          <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
          <Route path="/admin/users" element={<PlaceholderPage title="Контингент" />} />
          <Route path="/admin/works" element={<PlaceholderPage title="Работы" />} />
          <Route path="/admin/classrooms" element={<PlaceholderPage title="Аудитории" />} />
          <Route path="/admin/seating" element={<PlaceholderPage title="Рассадка" />} />
          <Route path="/admin/bank" element={<PlaceholderPage title="Банк задач" />} />
          <Route path="/admin/processing" element={<PlaceholderPage title="Обработка ЭМ" />} />
          <Route path="/admin/analytics" element={<PlaceholderPage title="Аналитика" />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App