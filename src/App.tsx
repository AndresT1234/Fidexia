import React, { useState } from 'react';
import { 
  ChevronRight, TrendingUp, Users, Award, BookOpen, Target, DollarSign, 
  BarChart3, MessageCircle, Plus, Filter, Star, CheckCircle, Clock, ArrowRight, 
  Menu, X, User, LogOut, Home, Briefcase, GraduationCap, Wallet, Settings,
  Bell, Search, Send, ThumbsUp, MessageSquare, Eye, Edit2, Camera, Mail,
  Lock, Phone, MapPin, Linkedin, Twitter, Facebook, Shield, ChevronDown
} from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [userType, setUserType] = useState<'investor' | 'entrepreneur' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectStep, setProjectStep] = useState(1);
  const [notifications, setNotifications] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const colors = {
    primary: '#1E2A78',
    green: '#28B485',
    background: '#F4F6F8',
    accent: '#FFD666'
  };

  const notificationsList = [
    { id: 1, message: 'Nueva oportunidad de inversión disponible', time: '5 min', read: false },
    { id: 2, message: 'Tienes un nuevo mensaje de Juan Pérez', time: '1 h', read: false },
    { id: 3, message: 'Tu proyecto fue aprobado', time: '2 h', read: false },
    { id: 4, message: 'Actualización en tu portafolio', time: '1 día', read: true },
    { id: 5, message: 'Completa tu perfil', time: '2 días', read: true }
  ];

  const NotificationsDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-lg" style={{color: colors.primary}}>Notificaciones</h3>
        <button className="text-sm text-blue-600 hover:underline">Marcar todas</button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notificationsList.map(notif => (
          <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}>
            <div className="flex gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DashboardHeader: React.FC<{ type: 'investor' | 'entrepreneur' | null | undefined }> = ({ type }) => {
    const navLinks = type === 'investor' ? [
      { view: 'investor-dashboard', label: 'Dashboard', icon: Home },
      { view: 'investor-portfolio', label: 'Portafolio', icon: Wallet },
      { view: 'community-forum', label: 'Comunidad', icon: MessageCircle },
      { view: 'learning-center', label: 'Aprendizaje', icon: GraduationCap }
    ] : [
      { view: 'entrepreneur-dashboard', label: 'Dashboard', icon: Home },
      { view: 'new-project', label: 'Proyectos', icon: Briefcase },
      { view: 'community-forum', label: 'Comunidad', icon: MessageCircle },
      { view: 'learning-center', label: 'Aprendizaje', icon: GraduationCap }
    ];

    const handleNav = (view: string): void => {
      setCurrentView(view);
      setIsMenuOpen(false);
    };

    return (
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav(type === 'investor' ? 'investor-dashboard' : 'entrepreneur-dashboard')}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{backgroundColor: colors.primary}}>F</div>
            <span className="text-xl font-bold" style={{color: colors.primary}}>Fidexia</span>
          </div>

          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <button key={link.view} onClick={() => handleNav(link.view)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <link.icon size={20} />
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={22} className="text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{notifications}</span>
                )}
              </button>
              {showNotifications && <NotificationsDropdown />}
            </div>

            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  {type === 'investor' ? 'C' : 'L'}
                </div>
                <ChevronDown size={16} className="text-gray-600 hidden md:block" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="font-bold">{type === 'investor' ? 'Carlos Ruiz' : 'Laura Gómez'}</div>
                    <div className="text-sm text-gray-500">{type === 'investor' ? 'Inversor' : 'Emprendedora'}</div>
                  </div>
                  <div className="py-2">
                    <button onClick={() => { handleNav('profile-settings'); setShowProfileMenu(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                      <User size={18} />Mi Perfil
                    </button>
                    <button onClick={() => { handleNav('profile-settings'); setShowProfileMenu(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                      <Settings size={18} />Configuración
                    </button>
                  </div>
                  <div className="border-t border-gray-100 py-2">
                    <button onClick={() => { setCurrentView('landing'); setUserType(null); setShowProfileMenu(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600">
                      <LogOut size={18} />Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
            <div className="fixed top-0 right-0 w-64 bg-white h-full shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-gray-600">
                <X size={24} />
              </button>
              <div className="flex items-center gap-2 mb-12">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{backgroundColor: colors.primary}}>F</div>
                <span className="text-xl font-bold" style={{color: colors.primary}}>Fidexia</span>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button key={link.view} onClick={() => handleNav(link.view)} className="flex items-center gap-3 text-lg text-gray-700 hover:text-gray-900">
                    <link.icon size={22} />
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    );
  };

  // --- VISTA: CONFIGURACIÓN DE PERFIL ---
const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen" style={{backgroundColor: colors.background}}>
      <DashboardHeader type={userType} />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentView(userType === 'investor' ? 'investor-dashboard' : 'entrepreneur-dashboard')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Volver al dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header con foto de perfil */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-green-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-4xl"
                    style={{background: `linear-gradient(135deg, ${colors.primary}, ${colors.green})`}}
                  >
                    {userType === 'investor' ? 'C' : 'L'}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Camera size={20} style={{color: colors.primary}} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold" style={{color: colors.primary}}>
                  {userType === 'investor' ? 'Carlos Ruiz' : 'Laura Gómez'}
                </h1>
                <p className="text-gray-600">{userType === 'investor' ? 'Inversor de Impacto' : 'Emprendedora Social'}</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg border-2 font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
                  style={{borderColor: colors.primary, color: colors.primary}}
                >
                  <Edit2 size={18} />
                  Editar Perfil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                    style={{backgroundColor: colors.green}}
                  >
                    Guardar Cambios
                  </button>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {['personal', 'security', 'notifications', 'privacy'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-semibold transition-all ${
                    activeTab === tab 
                      ? 'border-b-2' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === tab ? {borderColor: colors.primary, color: colors.primary} : {}}
                >
                  {tab === 'personal' && 'Información Personal'}
                  {tab === 'security' && 'Seguridad'}
                  {tab === 'notifications' && 'Notificaciones'}
                  {tab === 'privacy' && 'Privacidad'}
                </button>
              ))}
            </div>

            {/* Contenido de tabs */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      defaultValue={userType === 'investor' ? 'Carlos' : 'Laura'}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      defaultValue={userType === 'investor' ? 'Ruiz' : 'Gómez'}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userType === 'investor' ? 'carlos.ruiz@email.com' : 'laura.gomez@email.com'}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue="+57 300 123 4567"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Ubicación
                  </label>
                  <input
                    type="text"
                    defaultValue="Medellín, Colombia"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                  <textarea
                    rows={4}
                    disabled={!isEditing}
                    defaultValue={userType === 'investor' 
                      ? 'Inversor de impacto con 10 años de experiencia en proyectos de agricultura sostenible y energías renovables.'
                      : 'Emprendedora social apasionada por la agricultura urbana y la sostenibilidad alimentaria.'
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {userType === 'investor' && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2" style={{color: colors.primary}}>Sectores de Interés</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Agricultura', 'Educación', 'Energía', 'Salud', 'Tecnología'].map((sector) => (
                        <span key={sector} className="px-3 py-1 bg-white rounded-full text-sm font-medium" style={{color: colors.primary}}>
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Lock size={16} />
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  />
                </div>

                <button
                  className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                  style={{backgroundColor: colors.primary}}
                >
                  Actualizar Contraseña
                </button>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold mb-1">Autenticación de Dos Factores</h4>
                      <p className="text-sm text-gray-600">Añade una capa extra de seguridad</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg border-2 font-semibold" style={{borderColor: colors.green, color: colors.green}}>
                      Activar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                {[
                  { title: 'Nuevas oportunidades de inversión', desc: 'Recibe alertas de proyectos que coincidan con tus intereses' },
                  { title: 'Mensajes de la comunidad', desc: 'Notificaciones de respuestas y menciones' },
                  { title: 'Actualizaciones de proyectos', desc: 'Informes de progreso de tus inversiones' },
                  { title: 'Newsletter semanal', desc: 'Resumen de actividad y contenido destacado' }
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notif.title}</h4>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                      <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="p-4 border-2 border-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield size={18} style={{color: colors.primary}} />
                    Visibilidad del Perfil
                  </h4>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 mt-2">
                    <option>Público - Visible para todos</option>
                    <option>Solo miembros de Fidexia</option>
                    <option>Privado - Solo yo</option>
                  </select>
                </div>

                <div className="p-4 border-2 border-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-2">Datos compartidos con terceros</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Controla qué información puede ser compartida con socios estratégicos
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Información de contacto</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Historial de inversiones</span>
                    </label>
                  </div>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <h4 className="font-semibold text-red-700 mb-2">Zona de Peligro</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Eliminar tu cuenta es permanente y no se puede deshacer
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{backgroundColor: colors.primary}}>F</div>
            <span className="text-2xl font-bold" style={{color: colors.primary}}>Fidexia</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCurrentView('register')} className="px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all" style={{color: colors.primary}}>
              Registrarse
            </button>
            <button onClick={() => setCurrentView('login')} className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-all" style={{backgroundColor: colors.primary}}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{color: colors.primary}}>
            Inversión con Propósito,<br /><span style={{color: colors.green}}>Impacto con Retorno</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Conecta a emprendedores sociales con inversionistas que buscan rentabilidad y transformación real.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button onClick={() => { setUserType('investor'); setCurrentView('register'); }} className="group px-8 py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2" style={{backgroundColor: colors.primary}}>
              Soy Inversor<ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => { setUserType('entrepreneur'); setCurrentView('register'); }} className="group px-8 py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2" style={{backgroundColor: colors.green}}>
              Soy Emprendedor<ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold mb-2" style={{color: colors.green}}>452</div>
              <div className="text-gray-600">Proyectos Financiados</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold mb-2" style={{color: colors.primary}}>$28M</div>
              <div className="text-gray-600">Capital Movilizado</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold mb-2" style={{color: colors.accent}}>89%</div>
              <div className="text-gray-600">Tasa de Éxito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Historias de Impacto */}
      <section className="py-20 px-4" style={{backgroundColor: colors.background}}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{color: colors.primary}}>
            Historias de Impacto Real
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'María López', avatar: <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="María López" />, project: 'Agricultura Sostenible', impact: '300 familias beneficiadas', roi: '18% ROI' },
              { name: 'Carlos Ruiz', avatar: <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Carlos Ruiz" />, project: 'Educación Rural', impact: '1,200 niños con acceso', roi: '15% ROI' },
              { name: 'Ana Gómez', avatar: <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Ana Gómez" />, project: 'Energía Solar', impact: '50 comunidades iluminadas', roi: '22% ROI' },
              { name: 'Luis Martínez', avatar: <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Luis Martínez" />, project: 'Turismo Sostenible', impact: '200 empleos generados', roi: '20% ROI' },
              { name: 'Sofía Ramírez', avatar: <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="Sofía Ramírez" />, project: 'Agua Potable', impact: '5,000 personas con acceso', roi: '17% ROI' },
              { name: 'Jorge Fernández', avatar: <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Jorge Fernández" />, project: 'Salud Comunitaria', impact: '800 consultas médicas', roi: '16% ROI' }
            ].map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 rounded-full mb-4 overflow-hidden flex items-center justify-center bg-gray-100">
                  {story.avatar}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: colors.primary}}>{story.name}</h3>
                <p className="text-gray-600 mb-4">{story.project}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Users size={16} />
                  {story.impact}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{color: colors.green}}>
                  <TrendingUp size={16} />
                  {story.roi}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 text-white" style={{backgroundColor: colors.primary}}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">Fidexia</div>
          <p className="text-blue-200 mb-6">Inversión con propósito, impacto con retorno</p>
          <div className="flex justify-center gap-6">
            <Twitter size={24} className="cursor-pointer hover:opacity-80" />
            <Linkedin size={24} className="cursor-pointer hover:opacity-80" />
            <Facebook size={24} className="cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </footer>
    </div>
  );



   // --- VISTA: REGISTRO ---
  const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [activeTab, setActiveTab] = useState(userType || 'investor');

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{backgroundColor: colors.background}}>
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4" style={{backgroundColor: colors.primary}}>
              F
            </div>
            <h2 className="text-3xl font-bold" style={{color: colors.primary}}>Crear Cuenta en Fidexia</h2>
            <p className="text-gray-600 mt-2">Únete a nuestra comunidad de impacto</p>
          </div>

          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('investor')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'investor' ? 'bg-white shadow-md' : 'text-gray-500'
              }`}
              style={activeTab === 'investor' ? {color: colors.primary} : {}}
            >
              Inversor
            </button>
            <button
              onClick={() => setActiveTab('entrepreneur')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'entrepreneur' ? 'bg-white shadow-md' : 'text-gray-500'
              }`}
              style={activeTab === 'entrepreneur' ? {color: colors.green} : {}}
            >
              Emprendedor
            </button>
          </div>

          {step === 1 ? (
            <>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      placeholder="Juan"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                      type="text"
                      placeholder="Pérez"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres con mayúscula y número</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+57 300 123 4567"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <label className="text-sm text-gray-600">
                    Acepto los <span className="text-blue-600 cursor-pointer">términos y condiciones</span> y la <span className="text-blue-600 cursor-pointer">política de privacidad</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                  style={{backgroundColor: activeTab === 'investor' ? colors.primary : colors.green}}
                >
                  Continuar
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">O regístrate con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-lg border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="py-3 rounded-lg border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <Linkedin size={20} className="text-blue-600" />
                  LinkedIn
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: colors.green}}>
                <Mail size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: colors.primary}}>Verifica tu correo</h3>
              <p className="text-gray-600 mb-6">
                Hemos enviado un código de verificación a<br />
                <span className="font-semibold">tu@email.com</span>
              </p>
              <div className="flex gap-3 justify-center mb-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  setUserType(activeTab);
                  setCurrentView(activeTab === 'investor' ? 'investor-dashboard' : 'entrepreneur-dashboard');
                }}
                className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all mb-3"
                style={{backgroundColor: activeTab === 'investor' ? colors.primary : colors.green}}
              >
                Verificar y Continuar
              </button>
              <button className="text-sm text-gray-500 hover:underline">
                ¿No recibiste el código? Reenviar
              </button>
            </div>
          )}

          <div className="text-center mt-6">
            <button onClick={() => setCurrentView('landing')} className="text-sm text-gray-500 hover:underline">
              ← Volver al inicio
            </button>
            <div className="text-sm text-gray-600 mt-2">
              ¿Ya tienes cuenta? <button onClick={() => setCurrentView('login')} className="text-blue-600 font-semibold hover:underline">Inicia sesión</button>
            </div>
          </div>
        </div>
      </div>
    );
  }; 

  // --- VISTA: FORO DE COMUNIDAD ---
const CommunityForum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['Todos', 'Inversión', 'Emprendimiento', 'Impacto Social', 'Networking'];
  
  const posts = [
    {
      id: 1,
      author: 'María González',
      role: 'Emprendedora',
      avatar: 'MG',
      title: '¿Cómo medir el impacto social de mi proyecto?',
      content: 'Estoy desarrollando un proyecto de educación rural y necesito ayuda para establecer métricas claras de impacto social...',
      category: 'Impacto Social',
      likes: 24,
      comments: 12,
      time: 'Hace 2 horas',
      isLiked: false
    },
    {
      id: 2,
      author: 'Carlos Ruiz',
      role: 'Inversor',
      avatar: 'CR',
      title: 'Experiencias invirtiendo en agricultura sostenible',
      content: 'Después de 3 años invirtiendo en proyectos agrícolas, quiero compartir algunos aprendizajes clave...',
      category: 'Inversión',
      likes: 45,
      comments: 28,
      time: 'Hace 5 horas',
      isLiked: true
    },
    {
      id: 3,
      author: 'Ana Martínez',
      role: 'Emprendedora',
      avatar: 'AM',
      title: 'Busco mentor para proyecto de energía solar',
      content: 'Tengo un proyecto de energía solar comunitaria en fase inicial y busco un mentor con experiencia...',
      category: 'Networking',
      likes: 18,
      comments: 7,
      time: 'Hace 1 día',
      isLiked: false
    },
    {
      id: 4,
      author: 'Luis Fernández',
      role: 'Inversor',
      avatar: 'LF',
      title: 'Diversificación de portafolio de impacto',
      content: '¿Qué estrategias usan para diversificar su portafolio manteniendo el foco en impacto social?',
      category: 'Inversión',
      likes: 31,
      comments: 19,
      time: 'Hace 2 días',
      isLiked: false
    },
    {
      id: 5,
      author: 'Sofía Ramírez',
      role: 'Emprendedora',
      avatar: 'SR',
      title: 'Compartiendo recursos: plantillas financieras',
      content: 'He creado plantillas de proyección financiera que me ayudaron mucho. Las comparto con la comunidad...',
      category: 'Emprendimiento',
      likes: 67,
      comments: 34,
      time: 'Hace 3 días',
      isLiked: true
    },
    {
      id: 6,
      author: 'Jorge Pérez',
      role: 'Inversor',
      avatar: 'JP',
      title: 'Due diligence: checklist completo',
      content: 'Después de evaluar más de 50 proyectos, aquí mi checklist definitivo para due diligence...',
      category: 'Inversión',
      likes: 89,
      comments: 41,
      time: 'Hace 1 semana',
      isLiked: true
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen" style={{backgroundColor: colors.background}}>
      <DashboardHeader type={userType} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{color: colors.primary}}>
            Comunidad Fidexia
          </h1>
          <p className="text-gray-600">
            Conecta, aprende y comparte experiencias con inversores y emprendedores
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Botón nuevo post */}
            <button 
              className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              style={{backgroundColor: colors.green}}
            >
              <Plus size={20} />
              Nueva Publicación
            </button>

            {/* Categorías */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-bold mb-3" style={{color: colors.primary}}>
                Categorías
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === 'Todos' ? 'all' : cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      (cat === 'Todos' && selectedCategory === 'all') || 
                      cat.toLowerCase() === selectedCategory.toLowerCase()
                        ? 'font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={
                      (cat === 'Todos' && selectedCategory === 'all') || 
                      cat.toLowerCase() === selectedCategory.toLowerCase()
                        ? {backgroundColor: colors.background, color: colors.primary}
                        : {}
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Usuarios destacados */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-bold mb-3" style={{color: colors.primary}}>
                Miembros Activos
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'María González', role: 'Emprendedora', posts: 45 },
                  { name: 'Carlos Ruiz', role: 'Inversor', posts: 38 },
                  { name: 'Ana Martínez', role: 'Emprendedora', posts: 32 }
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{background: `linear-gradient(135deg, ${colors.primary}, ${colors.green})`}}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.posts} posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed de publicaciones */}
          <div className="md:col-span-3 space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                {/* Header del post */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{background: `linear-gradient(135deg, ${colors.primary}, ${colors.green})`}}
                    >
                      {post.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.role} • {post.time}</div>
                    </div>
                  </div>
                  <span 
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{backgroundColor: colors.background, color: colors.primary}}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Contenido */}
                <h3 className="text-xl font-bold mb-2" style={{color: colors.primary}}>
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.content}
                </p>

                {/* Acciones */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <button 
                    className={`flex items-center gap-2 transition-all ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <ThumbsUp size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                    <span className="font-semibold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all">
                    <MessageSquare size={18} />
                    <span className="font-semibold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-all ml-auto">
                    <Send size={18} />
                    <span className="font-semibold">Compartir</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold mb-2 text-gray-600">
                  No hay publicaciones en esta categoría
                </h3>
                <p className="text-gray-500">
                  Sé el primero en compartir algo con la comunidad
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

  // --- VISTA: LOGIN ---
  const LoginPage = () => {
    const [activeTab, setActiveTab] = useState(userType || 'investor');

    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: colors.background}}>
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4" style={{backgroundColor: colors.primary}}>
              F
            </div>
            <h2 className="text-3xl font-bold" style={{color: colors.primary}}>Bienvenido a Fidexia</h2>
          </div>

          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('investor')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'investor' ? 'bg-white shadow-md' : 'text-gray-500'
              }`}
              style={activeTab === 'investor' ? {color: colors.primary} : {}}
            >
              Inversor
            </button>
            <button
              onClick={() => setActiveTab('entrepreneur')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'entrepreneur' ? 'bg-white shadow-md' : 'text-gray-500'
              }`}
              style={activeTab === 'entrepreneur' ? {color: colors.green} : {}}
            >
              Emprendedor
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{borderColor: activeTab === 'investor' ? colors.primary : colors.green}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                style={{borderColor: activeTab === 'investor' ? colors.primary : colors.green}}
              />
              <div className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres con mayúscula y número</div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setUserType(activeTab);
                setCurrentView(activeTab === 'investor' ? 'investor-dashboard' : 'entrepreneur-dashboard');
              }}
              className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
              style={{backgroundColor: activeTab === 'investor' ? colors.primary : colors.green}}
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              className="w-full py-3 rounded-lg border-2 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              style={{borderColor: colors.primary, color: colors.primary}}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar con Google
            </button>
          </form>

          <div className="text-center mt-6">
            <button onClick={() => setCurrentView('landing')} className="text-sm text-gray-500 hover:underline">
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- VISTA: DASHBOARD EMPRENDEDOR ---
  const EntrepreneurDashboard = () => (
    <div className="min-h-screen" style={{backgroundColor: colors.background}}>
      <DashboardHeader type="entrepreneur" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">¡Hola, Laura! 👋</h1>
          <p className="text-green-100">Tu proyecto "Agricultura Urbana Sostenible" está en revisión</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Clock size={16} />
            <span>Tiempo estimado de respuesta: 2-3 días hábiles</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{color: colors.primary}}>Perfil Completo</h3>
              <span className="text-2xl font-bold" style={{color: colors.green}}>85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="h-2 rounded-full" style={{width: '85%', backgroundColor: colors.green}}></div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Información básica
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Documentos legales
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                Estados financieros
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <Target className="mb-4" style={{color: colors.green}} size={32} />
            <div className="text-3xl font-bold mb-1" style={{color: colors.primary}}>$45,000</div>
            <div className="text-gray-600 text-sm">Recaudado de $100,000</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="h-2 rounded-full" style={{width: '45%', backgroundColor: colors.green}}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <Users className="mb-4" style={{color: colors.primary}} size={32} />
            <div className="text-3xl font-bold mb-1" style={{color: colors.primary}}>28</div>
            <div className="text-gray-600 text-sm">Inversores interesados</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setCurrentView('new-project')}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{color: colors.primary}}>Nuevo Proyecto</h3>
                <p className="text-gray-600">Postula tu siguiente iniciativa</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{backgroundColor: colors.green}}>
                <Plus className="text-white" />
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('learning-center')}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{color: colors.primary}}>Centro de Aprendizaje</h3>
                <p className="text-gray-600">3 cursos recomendados</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{backgroundColor: colors.accent}}>
                <GraduationCap className="text-white" />
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-6" style={{color: colors.primary}}>Cursos Recomendados</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Finanzas para Emprendedores', duration: '4h', progress: 0 },
              { title: 'Pitch Efectivo', duration: '2h', progress: 60 },
              { title: 'Medición de Impacto Social', duration: '3h', progress: 100 }
            ].map((course, idx) => (
              <div key={idx} className="border-2 border-gray-100 rounded-xl p-4 hover:border-green-300 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-lg mb-3 flex items-center justify-center" style={{backgroundColor: colors.accent}}>
                  <BookOpen size={24} />
                </div>
                <h4 className="font-semibold mb-2">{course.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{course.duration}</span>
                  {course.progress === 100 && <CheckCircle size={16} className="text-green-500" />}
                  {course.progress > 0 && course.progress < 100 && <span className="text-green-500">{course.progress}%</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- VISTA: FORMULARIO NUEVO PROYECTO ---
  const NewProjectForm = () => {
    const steps = [
      { num: 1, title: 'Datos Generales' },
      { num: 2, title: 'Impacto Social' },
      { num: 3, title: 'Finanzas' },
      { num: 4, title: 'Validación' }
    ];

    return (
      <div className="min-h-screen" style={{backgroundColor: colors.background}}>
        <DashboardHeader type="entrepreneur" />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentView('entrepreneur-dashboard')}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            ← Volver al dashboard
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-2" style={{color: colors.primary}}>Postular Nuevo Proyecto</h2>
            <p className="text-gray-600 mb-8">Completa la información en 4 simples pasos</p>

            {/* Indicador de Pasos */}
            <div className="mb-12">
              <div className="flex justify-between mb-4">
                {steps.map((step) => (
                  <div key={step.num} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                        projectStep === step.num ? 'scale-110' : ''
                      }`}
                      style={{
                        backgroundColor: projectStep >= step.num ? colors.green : '#E5E7EB',
                        color: projectStep >= step.num ? 'white' : '#9CA3AF'
                      }}
                    >
                      {projectStep > step.num ? <CheckCircle size={24} /> : step.num}
                    </div>
                    <div className={`text-sm text-center ${projectStep === step.num ? 'font-semibold' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{width: `${((projectStep - 1) / 3) * 100}%`, backgroundColor: colors.green}}
                ></div>
              </div>
            </div>

            {/* Contenido de Pasos */}
            <div className="space-y-6">
              {projectStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Proyecto</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2" placeholder="Ej: Agricultura Urbana Sostenible" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2">
                      <option>Agricultura</option>
                      <option>Educación</option>
                      <option>Energía</option>
                      <option>Salud</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción Breve</label>
                    <textarea className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2" rows={4} placeholder="Describe tu proyecto en 200 palabras..."></textarea>
                  </div>
                </>
              )}

              {projectStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ODS Principales (máx. 3)</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Hambre Cero', 'Educación', 'Igualdad', 'Ciudades', 'Clima', 'Paz'].map((ods) => (
                        <button key={ods} className="p-3 border-2 rounded-lg hover:border-green-500 transition-all text-sm">
                          {ods}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiarios Directos</label>
                    <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2" placeholder="Número estimado de personas" />
                  </div>
                </>
              )}

              {projectStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monto Solicitado (USD)</label>
                    <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2" placeholder="100000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ROI Proyectado (%)</label>
                    <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2" placeholder="15" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plazo de Retorno (meses)</label>
                    <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2" placeholder="24" />
                  </div>
                </>
              )}

              {projectStep === 4 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: colors.green}}>
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: colors.primary}}>Validación Completada</h3>
                  <p className="text-gray-600 mb-6">Tu proyecto cumple con todos los requisitos</p>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 max-w-md mx-auto">
                    <ul className="text-left space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Documentación completa
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Viabilidad financiera verificada
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Impacto social cuantificable
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Botones de Navegación de Pasos */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setProjectStep(projectStep - 1)}
                className={`px-6 py-3 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-all ${projectStep === 1 ? 'invisible' : ''}`}
                style={{borderColor: colors.primary, color: colors.primary}}
              >
                Anterior
              </button>
              
              {projectStep < 4 ? (
                <button
                  onClick={() => setProjectStep(projectStep + 1)}
                  className="ml-auto px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                  style={{backgroundColor: colors.green}}
                >
                  Siguiente
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('entrepreneur-dashboard')}
                  className="ml-auto px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                  style={{backgroundColor: colors.green}}
                >
                  Enviar Proyecto
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- VISTA: CENTRO DE APRENDIZAJE ---
  // (Esta vista es compartida por ambos tipos de usuario)
  const LearningCenter = () => {
    // Role-specific course catalogs
    const investorCourses = [
        { title: 'Due Diligence para Inversores', duration: '3h', level: 'Intermedio', progress: 0, lessons: 8 },
        { title: 'Estructuración de Portafolios de Impacto', duration: '4h', level: 'Avanzado', progress: 20, lessons: 10 },
        { title: 'Análisis de Riesgo y Retorno', duration: '2.5h', level: 'Intermedio', progress: 0, lessons: 6 },
        { title: 'Métricas de Impacto para Inversores', duration: '3h', level: 'Básico', progress: 50, lessons: 7 },
        { title: 'Tendencias en Inversión de Impacto', duration: '2h', level: 'Básico', progress: 100, lessons: 5 },
        { title: 'Evaluación de Proyectos Sociales', duration: '3.5h', level: 'Avanzado', progress: 0, lessons: 9 }
    ];

    const entrepreneurCourses = [
        { title: 'Validación de Mercado para Emprendedores', duration: '3h', level: 'Básico', progress: 0, lessons: 9 },
        { title: 'Modelo de Negocio y Proyección Financiera', duration: '4h', level: 'Intermedio', progress: 30, lessons: 12 },
        { title: 'Cómo Preparar un Pitch para Inversores', duration: '2h', level: 'Básico', progress: 60, lessons: 5 },
        { title: 'Medición de Impacto Social (Emprendedores)', duration: '3h', level: 'Intermedio', progress: 0, lessons: 8 },
        { title: 'Estrategias de Crecimiento Sostenible', duration: '2.5h', level: 'Avanzado', progress: 100, lessons: 6 },
        { title: 'Acceso a Financiamiento para Emprendedores', duration: '3.5h', level: 'Intermedio', progress: 0, lessons: 10 }
    ];

    // If userType is not set, let them pick which learning path they want to see
    const [localRole, setLocalRole] = useState<'investor' | 'entrepreneur' | 'all'>(userType || 'all');

    const selectedRole = userType || localRole;

    const courses = selectedRole === 'investor' ? investorCourses
      : selectedRole === 'entrepreneur' ? entrepreneurCourses
      : [...investorCourses, ...entrepreneurCourses];

    return (
      <div className="min-h-screen" style={{backgroundColor: colors.background}}>
        <DashboardHeader type={userType} />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-1" style={{color: colors.primary}}>Centro de Aprendizaje</h1>
              <p className="text-gray-600">Cursos curados según tu perfil para maximizar impacto y retorno</p>
            </div>

            {/* Role selector when userType is not fixed */}
            {!userType && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLocalRole('all')}
                  className={`px-3 py-2 rounded-lg font-medium ${localRole === 'all' ? 'bg-white shadow-md' : 'bg-white/60'}`}
                  style={{border: '2px solid #E5E7EB'}}
                >
                  Todos
                </button>
                <button
                  onClick={() => setLocalRole('investor')}
                  className={`px-3 py-2 rounded-lg font-medium ${localRole === 'investor' ? 'bg-white shadow-md' : 'bg-white/60'}`}
                  style={{border: '2px solid #E5E7EB', color: colors.primary}}
                >
                  Inversor
                </button>
                <button
                  onClick={() => setLocalRole('entrepreneur')}
                  className={`px-3 py-2 rounded-lg font-medium ${localRole === 'entrepreneur' ? 'bg-white shadow-md' : 'bg-white/60'}`}
                  style={{border: '2px solid #E5E7EB', color: colors.green}}
                >
                  Emprendedor
                </button>
              </div>
            )}
          </div>

          {/* Filtros */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {['Todos', 'En progreso', 'Completados', 'Recomendados'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-lg font-medium whitespace-nowrap hover:opacity-80 transition-all"
                style={{backgroundColor: filter === 'Todos' ? colors.primary : 'white', color: filter === 'Todos' ? 'white' : colors.primary, border: filter !== 'Todos' ? '2px solid #E5E7EB' : 'none'}}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Lista de Cursos */}
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <div
                key={`${selectedRole}-${idx}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="h-32 bg-gradient-to-br flex items-center justify-center" style={{background: `linear-gradient(135deg, ${colors.primary}, ${colors.green})`}}>
                  <BookOpen size={48} className="text-white" />
                </div>
                <div className="p-6">
                  {course.progress === 100 && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{backgroundColor: colors.green, color: 'white'}}>
                      <CheckCircle size={14} />
                      Completado
                    </div>
                  )}
                  {course.progress > 0 && course.progress < 100 && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{backgroundColor: colors.accent, color: '#1E2A78'}}>
                      En progreso {course.progress}%
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.lessons} lecciones</span>
                  </div>
                  <div className="text-sm font-medium mb-3" style={{color: colors.primary}}>{course.level}</div>
                  
                  {course.progress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all" style={{width: `${course.progress}%`, backgroundColor: colors.green}}></div>
                    </div>
                  )}
                  
                  {/* Botones de acción */}
                  {course.progress === 100 && (
                    <button className="w-full mt-4 py-2 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-all" style={{borderColor: colors.green, color: colors.green}}>
                      Descargar Certificado
                    </button>
                  )}
                  {course.progress > 0 && course.progress < 100 && (
                    <button className="w-full mt-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-all" style={{backgroundColor: colors.green}}>
                      Continuar Curso
                    </button>
                  )}
                  {course.progress === 0 && (
                    <button className="w-full mt-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-all" style={{backgroundColor: colors.primary}}>
                      Iniciar Curso
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // --- VISTA: DASHBOARD INVERSOR (NUEVO) ---
  const InvestorDashboard = () => {
    const opportunities = [
      { title: 'Agua Limpia Andina', sector: 'Agua', roi: '14%', goal: 80000, raised: 30000 },
      { title: 'EduTech Para Todos', sector: 'Educación', roi: '18%', goal: 120000, raised: 95000 },
      { title: 'Reciclaje Urbano', sector: 'Medio Ambiente', roi: '16%', goal: 50000, raised: 10000 },
      { title: 'Energía Solar Comunitaria', sector: 'Energía', roi: '12%', goal: 150000, raised: 60000 },
      { title: 'Salud Móvil Rural', sector: 'Salud', roi: '20%', goal: 90000, raised: 45000 }
    ];

    return (
      <div className="min-h-screen" style={{backgroundColor: colors.background}}>
        <DashboardHeader type="investor" />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">¡Hola, Carlos! 👋</h1>
            <p className="text-blue-100">Bienvenido a tu panel de inversión de impacto.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <Wallet className="mb-4" style={{color: colors.primary}} size={32} />
              <div className="text-3xl font-bold mb-1" style={{color: colors.primary}}>$120,500</div>
              <div className="text-gray-600 text-sm">Valor del Portafolio</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <TrendingUp className="mb-4" style={{color: colors.green}} size={32} />
              <div className="text-3xl font-bold mb-1" style={{color: colors.green}}>+12.5%</div>
              <div className="text-gray-600 text-sm">Rendimiento Anual (ROI)</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <Users className="mb-4" style={{color: colors.primary}} size={32} />
              <div className="text-3xl font-bold mb-1" style={{color: colors.primary}}>8</div>
              <div className="text-gray-600 text-sm">Proyectos Invertidos</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" style={{color: colors.primary}}>Nuevas Oportunidades</h3>
              <button className="text-sm font-semibold flex items-center gap-1" style={{color: colors.green}}>
                Ver Todas <ArrowRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {opportunities.map((op, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-100 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="font-bold">{op.title}</div>
                    <div className="text-sm text-gray-500">{op.sector}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg" style={{color: colors.green}}>{op.roi}</div>
                    <div className="text-sm text-gray-500">ROI Proy.</div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{width: `${(op.raised / op.goal) * 100}%`, backgroundColor: colors.green}}></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 text-right">${op.raised.toLocaleString()} / ${op.goal.toLocaleString()}</div>
                  </div>
                  <button className="w-full md:w-auto px-4 py-2 rounded-lg text-white font-semibold text-sm" style={{backgroundColor: colors.primary}}>
                    Invertir
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };
  
  // --- VISTA: PORTAFOLIO INVERSOR (NUEVO) ---
  const InvestorPortfolio = () => {
    const investments = [
      { title: 'Agricultura Sostenible', status: 'Activo', amount: 25000, roi: 18, impact: '300 familias' },
      { title: 'Educación Rural', status: 'Activo', amount: 40000, roi: 15, impact: '1,200 niños' },
      { title: 'Energía Solar', status: 'Completado', amount: 15000, roi: 22, impact: '50 comunidades' },
      { title: 'App Salud Mental', status: 'Activo', amount: 40500, roi: 12, impact: '10,000 usuarios' },
      { title: 'Reciclaje Urbano', status: 'Completado', amount: 20000, roi: 16, impact: '5 toneladas de residuos' },
      { title: 'Agua Limpia Andina', status: 'Activo', amount: 20000, roi: 14, impact: '2,000 personas' }
    ];

    return (
      <div className="min-h-screen" style={{backgroundColor: colors.background}}>
        <DashboardHeader type="investor" />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentView('investor-dashboard')}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            ← Volver al dashboard
          </button>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3" style={{color: colors.primary}}>Mi Portafolio</h1>
            <p className="text-gray-600">Gestión y seguimiento de tus inversiones de impacto.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <DollarSign className="mb-4" style={{color: colors.primary}} size={32} />
              <div className="text-3xl font-bold mb-1" style={{color: colors.primary}}>$120,500</div>
              <div className="text-gray-600 text-sm">Total Invertido</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <BarChart3 className="mb-4" style={{color: colors.green}} size={32} />
              <div className="text-3xl font-bold mb-1" style={{color: colors.green}}>$15,800</div>
              <div className="text-gray-600 text-sm">Retorno Total</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <Award className="mb-4" style={{color: colors.accent}} size={32} />
              <div className="text-3xl font-bold mb-1" style={{color: colors.primary}}>+12k</div>
              <div className="text-gray-600 text-sm">Vidas Impactadas</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-6" style={{color: colors.primary}}>Mis Inversiones</h3>
            <div className="space-y-4">
              {investments.map((inv, idx) => (
                <div key={idx} className="border-2 border-gray-100 rounded-xl p-4 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <div className="font-bold">{inv.title}</div>
                    <span 
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        inv.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Inversión</div>
                    <div className="font-bold">${inv.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">ROI</div>
                    <div className="font-bold" style={{color: colors.green}}>{inv.roi}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Impacto</div>
                    <div className="font-bold text-sm">{inv.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  // --- LÓGICA DE RENDERIZADO DE VISTAS ---
  const renderView = () => {
  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'register':  // Agregar este caso si no existe
      return <RegisterPage />;
    case 'login':
      return <LoginPage />;
    case 'entrepreneur-dashboard':
      return <EntrepreneurDashboard />;
    case 'new-project':
      return <NewProjectForm />;
    case 'learning-center':
      return <LearningCenter />;
    case 'investor-dashboard':
      return <InvestorDashboard />;
    case 'investor-portfolio':
      return <InvestorPortfolio />;
    case 'community-forum':  // NUEVO
      return <CommunityForum />;
    case 'profile-settings':
      return <ProfileSettings />;
    default:
      return <LandingPage />;
  }
};

  // El retorno principal de la App
  return (
    <div className="antialiased font-sans">
      {renderView()}
    </div>
  );
};

export default App;

