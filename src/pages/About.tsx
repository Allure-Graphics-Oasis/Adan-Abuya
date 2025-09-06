import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, CheckCircle, Award, Users, Recycle } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Quality Guaranteed",
      description: "Every item undergoes thorough inspection before listing"
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive pricing on all second-hand equipment"
    },
    {
      icon: Users,
      title: "Trusted Service", 
      description: "Years of experience serving satisfied customers"
    },
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description: "Promoting sustainability through equipment reuse"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Adan UK
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Your trusted partner for quality second-hand equipment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At AXUK, we believe in giving quality equipment a second life. Our mission is to provide 
              businesses and individuals with affordable, high-quality second-hand equipment while promoting 
              sustainability and reducing waste.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With years of experience in the industry, we carefully select and inspect every item to ensure 
              our customers receive excellent value for their investment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <a 
                  href="https://wa.me/+447914344843?text=Hi, I'd like to know more about your business"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Us
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+254720983015">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-card rounded-lg p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We thoroughly inspect every item to ensure it meets our high standards before offering it to our customers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Our customers are at the heart of everything we do. We strive to provide exceptional service and support.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  By promoting the reuse of equipment, we contribute to a more sustainable future for our planet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-primary rounded-lg p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Equipment?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Browse our extensive catalog or get in touch with us to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/products">
                Browse Products
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a 
                href="https://wa.me/+447914344843?text=Hi, I have specific equipment needs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 backdrop-blur border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Discuss Your Needs
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Allure Graphics Oasis Distributions | 
              Email: <a href="mailto:alluregraphicsoasis.co@gmail.com" className="text-primary hover:underline">alluregraphicsoasis.co@gmail.com</a> | 
              Support: <a href="tel:+254740275539" className="text-primary hover:underline">+254740275539</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;