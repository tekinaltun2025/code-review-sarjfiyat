import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Hatası: Kullanıcı mevcut olmayan bir sayfaya erişmeye çalıştı:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    const isMobilePath = location.pathname.startsWith('/m');
    navigate(isMobilePath ? '/m' : '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 bg-card rounded-lg shadow-md max-w-md border border-border">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-foreground mb-6">{t("notFound.title")}</p>
        <p className="text-muted-foreground mb-6">
          {t("notFound.message")}
        </p>
        <Button
          onClick={handleGoHome}
          className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-6 rounded-lg transition-colors"
        >
          {t("notFound.backHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
