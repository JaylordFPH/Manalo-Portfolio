import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export function Contact() {
  // KAYO BAHALA DITO HAHAHAHAH

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-[#2D0140] to-[#00010D]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#A305A6] to-[#660273] bg-clip-text text-transparent">
            Let&apos;s Work Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#660273] to-[#A305A6] mx-auto rounded-full"></div>
          <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
            Ready to bring your digital vision to life? Let&apos;s discuss your
            project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-[#010326]/50 border-[#660273]/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send a Message
              </h3>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input
                      className="bg-[#00010D]/50 border-[#660273]/30 text-white placeholder:text-gray-400 focus:border-[#A305A6]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input
                      className="bg-[#00010D]/50 border-[#660273]/30 text-white placeholder:text-gray-400 focus:border-[#A305A6]"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="bg-[#00010D]/50 border-[#660273]/30 text-white placeholder:text-gray-400 focus:border-[#A305A6]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <Input
                    className="bg-[#00010D]/50 border-[#660273]/30 text-white placeholder:text-gray-400 focus:border-[#A305A6]"
                    placeholder="Web Design, Mobile App, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    className="bg-[#00010D]/50 border-[#660273]/30 text-white placeholder:text-gray-400 focus:border-[#A305A6] min-h-[120px]"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-[#660273] to-[#A305A6] hover:from-[#A305A6] hover:to-[#660273] text-white font-semibold py-3 transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                I&apos;m always excited to work on new projects and collaborate with
                amazing people. Whether you have a specific project in mind or
                just want to chat about design, feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#010326]/30 border border-[#660273]/20">
                <div className="p-2 bg-[#A305A6] rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">manalojenelyn02@designer.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#010326]/30 border border-[#660273]/20">
                <div className="p-2 bg-[#A305A6] rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">63+ 9456358029</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#010326]/30 border border-[#660273]/20">
                <div className="p-2 bg-[#A305A6] rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">Quezon City Manila, Philippines</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                <div className="p-3 bg-[#010326]/30 border border-[#660273]/20 rounded-lg hover:border-[#A305A6]/40 transition-colors cursor-pointer">
                  <Linkedin className="h-5 w-5 text-[#A305A6]" />
                </div>
                <div className="p-3 bg-[#010326]/30 border border-[#660273]/20 rounded-lg hover:border-[#A305A6]/40 transition-colors cursor-pointer">
                  <Twitter className="h-5 w-5 text-[#A305A6]" />
                </div>
                <div className="p-3 bg-[#010326]/30 border border-[#660273]/20 rounded-lg hover:border-[#A305A6]/40 transition-colors cursor-pointer">
                  <Github className="h-5 w-5 text-[#A305A6]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
