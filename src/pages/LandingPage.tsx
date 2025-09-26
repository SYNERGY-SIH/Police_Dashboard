import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, MapIcon, AlertTriangleIcon, LockIcon } from 'lucide-react';
import { useTranslation } from "react-i18next";

const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt={t("gov")}
              className="h-12 mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold">{t("app_title")}</h1>
              <p className="text-blue-200">{t("gov")}</p>
            </div>
          </div>
          <Link
            to="/login"
            className="bg-white text-blue-800 px-6 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors"
          >
            {t("login")}
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">{t("hero_title")}</h2>
              <p className="text-xl mb-6">{t("hero_subtitle")}</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition-colors"
                >
                  {t("download_android")}
                </a>
                <a
                  href="#"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-800 transition-colors"
                >
                  {t("download_ios")}
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="India Tourism"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t("features")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ShieldIcon size={32} className="text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("tourist_protection")}
                </h3>
                <p className="text-gray-600">{t("tourist_protection_desc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <MapIcon size={32} className="text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("location_tracking")}
                </h3>
                <p className="text-gray-600">{t("location_tracking_desc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <AlertTriangleIcon size={32} className="text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("emergency_response")}
                </h3>
                <p className="text-gray-600">{t("emergency_response_desc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <LockIcon size={32} className="text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("secure_docs")}
                </h3>
                <p className="text-gray-600">{t("secure_docs_desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t("mission")}
            </h2>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-800">
              <p className="text-lg text-gray-700 mb-6">{t("mission_para1")}</p>
              <p className="text-lg text-gray-700">{t("mission_para2")}</p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t("privacy")}
            </h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{t("privacy_data_collection_title")}</h3>
              <p className="text-gray-700 mb-6">{t("privacy_data_collection")}</p>

              <h3 className="text-xl font-semibold mb-4">{t("privacy_data_usage_title")}</h3>
              <p className="text-gray-700 mb-6">{t("privacy_data_usage")}</p>

              <h3 className="text-xl font-semibold mb-4">{t("privacy_data_security_title")}</h3>
              <p className="text-gray-700 mb-6">{t("privacy_data_security")}</p>

              <h3 className="text-xl font-semibold mb-4">{t("privacy_data_retention_title")}</h3>
              <p className="text-gray-700">{t("privacy_data_retention")}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt={t("gov")}
                  className="h-10 mr-3"
                />
                <span className="text-xl font-bold">{t("app_title")}</span>
              </div>
              <p className="text-blue-200 mt-2">{t("copyright")}</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white">
                {t("tos")}
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                {t("contact")}
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                {t("help")}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Language Switcher */}
      <div className="fixed bottom-4 right-4 bg-white p-2 rounded shadow">
        <button onClick={() => i18n.changeLanguage("en")} className="px-2">EN</button>
        <button onClick={() => i18n.changeLanguage("hi")} className="px-2">हिं</button>
        <button onClick={() => i18n.changeLanguage("as")} className="px-2">অসম</button>
        <button onClick={() => i18n.changeLanguage("mni")} className="px-2">ꯃꯅꯤ</button>
        <button onClick={() => i18n.changeLanguage("kh")} className="px-2">Khasi</button>
        <button onClick={() => i18n.changeLanguage("mi")} className="px-2">Mizo</button>
        <button onClick={() => i18n.changeLanguage("ng")} className="px-2">Naga</button>
      </div>
    </div>
  );
};

export default LandingPage;
